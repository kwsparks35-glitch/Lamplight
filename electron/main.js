"use strict";

const { app, BrowserWindow, dialog, Menu, protocol, session } = require("electron");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const APP_SCHEME = "lamplight";
const APP_HOST = "app";
const APP_ORIGIN = `${APP_SCHEME}://${APP_HOST}`;

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "base-uri 'none'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "media-src 'self' data: blob:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'"
].join("; ");

const MIME_TYPES = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".woff2", "font/woff2"]
]);

protocol.registerSchemesAsPrivileged([{
  scheme: APP_SCHEME,
  privileges: {
    standard: true,
    secure: true,
    supportFetchAPI: true,
    corsEnabled: false,
    stream: true
  }
}]);

app.enableSandbox();

function rendererRoot() {
  return app.isPackaged
    ? path.join(app.getAppPath(), "www")
    : path.resolve(__dirname, "..", "www");
}

function secureHeaders(contentType) {
  return {
    "Cache-Control": "no-store",
    "Content-Security-Policy": CONTENT_SECURITY_POLICY,
    "Content-Type": contentType,
    "Cross-Origin-Opener-Policy": "same-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY"
  };
}

async function serveLocalAsset(request) {
  const url = new URL(request.url);
  if (url.hostname !== APP_HOST || request.method !== "GET") {
    return new Response("Not found", { status: 404 });
  }

  let relativePath;
  try {
    relativePath = decodeURIComponent(url.pathname).replace(/^\/+/, "") || "index.html";
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }

  const root = rendererRoot();
  const target = path.resolve(root, relativePath);
  if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const body = await readFile(target);
    const contentType = MIME_TYPES.get(path.extname(target).toLowerCase())
      || "application/octet-stream";
    return new Response(body, {
      status: 200,
      headers: secureHeaders(contentType)
    });
  } catch (error) {
    const status = error?.code === "ENOENT" ? 404 : 500;
    return new Response(status === 404 ? "Not found" : "Unable to load Lamplight", {
      status,
      headers: secureHeaders("text/plain; charset=utf-8")
    });
  }
}

function isInternalLocation(rawUrl) {
  try {
    const url = new URL(rawUrl);
    return url.protocol === `${APP_SCHEME}:` && url.hostname === APP_HOST;
  } catch {
    return false;
  }
}

function hardenSession() {
  const appSession = session.defaultSession;
  appSession.setPermissionCheckHandler(() => false);
  appSession.setPermissionRequestHandler((_webContents, _permission, callback) => {
    callback(false);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1040,
    height: 860,
    minWidth: 360,
    minHeight: 640,
    show: false,
    backgroundColor: "#0B1F18",
    autoHideMenuBar: true,
    title: "Lamplight",
    webPreferences: {
      allowRunningInsecureContent: false,
      contextIsolation: true,
      devTools: !app.isPackaged,
      nodeIntegration: false,
      sandbox: true,
      spellcheck: false,
      webSecurity: true,
      webviewTag: false
    }
  });

  win.webContents.setWindowOpenHandler(() => ({ action: "deny" }));
  win.webContents.on("will-attach-webview", event => event.preventDefault());
  win.webContents.on("will-navigate", (event, destination) => {
    if (!isInternalLocation(destination)) event.preventDefault();
  });
  win.once("ready-to-show", () => win.show());
  win.loadURL(`${APP_ORIGIN}/index.html`).catch(error => {
    console.error("Lamplight renderer failed to load.", error);
    dialog.showErrorBox(
      "Lamplight could not start",
      "The local application files could not be loaded. Reinstall Lamplight or report the package version to support."
    );
    if (!win.isDestroyed()) win.destroy();
  });

  return win;
}

const hasSingleInstanceLock = app.requestSingleInstanceLock();
if (!hasSingleInstanceLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    const [win] = BrowserWindow.getAllWindows();
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  app.whenReady().then(async () => {
    app.setAppUserModelId("com.canonseries.lamplight");
    Menu.setApplicationMenu(null);
    await protocol.handle(APP_SCHEME, serveLocalAsset);
    hardenSession();
    createWindow();
  }).catch(error => {
    console.error("Lamplight initialization failed.", error);
    dialog.showErrorBox(
      "Lamplight could not start",
      "The desktop application could not initialize its secure local renderer. Reinstall Lamplight or contact support."
    );
    app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

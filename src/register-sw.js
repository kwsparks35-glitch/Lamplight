const secureLocalhost=["localhost","127.0.0.1","[::1]","::1"].includes(location.hostname);
if("serviceWorker" in navigator && (location.protocol==="https:"||secureLocalhost)){
  addEventListener("load", async ()=>{
    let reg;try{reg=await navigator.serviceWorker.register("sw.js");}catch(e){return;}
    reg.addEventListener("updatefound",()=>{
      const w=reg.installing;
      w&&w.addEventListener("statechange",()=>{
        if(w.state==="installed"&&navigator.serviceWorker.controller){
          const t=document.getElementById("toast");
          if(t){t.textContent="Update ready — close and reopen to refresh";t.classList.add("show");
            setTimeout(()=>t.classList.remove("show"),4000);}
        }});
    });
  });
}

/* ============== LAMPLIGHT 1.2 · PROFILE SCHEMA 5 ==============
   Free forever. Scripture: World English Bible (public domain).
*/
const BIBLE_DATA = __LAMPLIGHT_BIBLE_DATA__;
const APP_VERSION = "1.2.1";
const TRANSLATION = { name:"World English Bible", short:"WEB" };

/* ---------- TOPICAL INDEX (each ref = one passage unit) ---------- */
const TGROUPS = [
{g:"Begin Here", t:[
 {n:"Canon Starter Pack", i:"🪔", d:"Kenny's original flashcard deck", r:["Joshua 1:9","Isaiah 41:10","Isaiah 30:21-22","1 Corinthians 13:4-7","2 Peter 1:5-8","Hebrews 11:1-3","Jeremiah 29:11-14","Deuteronomy 6:4-9","2 John 1:4-6","John 9:35-38","Galatians 5:22-23"]},
 {n:"Romans Road", i:"🛤️", d:"The gospel walked through Romans", r:["Romans 3:23","Romans 6:23","Romans 5:8","Romans 10:9-10","Romans 10:13","Romans 8:1"]},
 {n:"Psalm 23", i:"🐑", d:"The Shepherd Psalm, whole", r:["Psalms 23:1-6"]},
 {n:"Psalm 91", i:"🛡️", d:"The shelter of the Most High", r:["Psalms 91:1-7","Psalms 91:14-16"]},
 {n:"The Beatitudes", i:"⛰️", d:"Blessed are…", r:["Matthew 5:3-12"]},
 {n:"The Lord's Prayer", i:"🙏", d:"Pray like this", r:["Matthew 6:9-13"]},
 {n:"Ten Commandments", i:"📜", d:"Exodus 20", r:["Exodus 20:1-17"]},
 {n:"Armor of God", i:"⚔️", d:"Ephesians 6", r:["Ephesians 6:10-18"]},
 {n:"The Love Chapter", i:"❤️", d:"1 Corinthians 13, whole", r:["1 Corinthians 13:1-13"]},
 {n:"The Shema", i:"🕎", d:"Hear, O Israel", r:["Deuteronomy 6:4-9"]}
]},
{g:"Walking Through Life", t:[
 {n:"Hope", i:"🌅", d:"Anchored expectation in God", r:["Jeremiah 29:11","Romans 15:13","Romans 5:3-5","Psalms 42:11","Lamentations 3:21-24","Isaiah 40:31","Hebrews 6:19","Romans 8:24-25","1 Peter 1:3","Proverbs 23:18"]},
 {n:"Anxiety & Worry", i:"🌬️", d:"Casting every care on him", r:["Philippians 4:6-7","Matthew 6:25-27","Matthew 6:34","1 Peter 5:7","Psalms 55:22","Isaiah 26:3","Psalms 94:19","John 14:1","Psalms 56:3"]},
 {n:"Struggle & Trial", i:"⛰️", d:"Pressed but not crushed", r:["James 1:2-4","2 Corinthians 4:8-9","Psalms 34:19","John 16:33","1 Peter 5:10","Psalms 46:1","2 Corinthians 12:9-10","Psalms 121:1-2","Isaiah 43:2","Romans 8:28"]},
 {n:"Wrestling with God", i:"🤼", d:"Honest struggle, deep faith", r:["Genesis 32:24-30","Job 7:11","Job 13:3","Psalms 13:1-2","Psalms 22:1-2","Habakkuk 1:2-3","Jeremiah 12:1","Psalms 77:7-9","Mark 9:24","Lamentations 3:19-24"]},
 {n:"Grief & Comfort", i:"🤍", d:"Near to the brokenhearted", r:["Psalms 34:18","Matthew 5:4","Revelation 21:4","Psalms 147:3","2 Corinthians 1:3-4","John 11:25-26","1 Thessalonians 4:13-14","Psalms 30:11","Isaiah 61:1-3"]},
 {n:"Healing", i:"🌿", d:"The Lord who heals", r:["Jeremiah 17:14","Psalms 103:2-3","Isaiah 53:5","James 5:14-15","Psalms 147:3","Exodus 15:26","3 John 1:2","Matthew 4:23"]},
 {n:"Loneliness", i:"🌙", d:"Never left, never forsaken", r:["Deuteronomy 31:8","Psalms 68:6","Isaiah 41:10","Matthew 28:20","Psalms 139:7-10","Hebrews 13:5","John 14:18"]},
 {n:"Temptation", i:"🚪", d:"A way of escape", r:["1 Corinthians 10:13","James 1:13-15","Matthew 26:41","Hebrews 2:18","Hebrews 4:15-16","James 4:7","Psalms 119:11"]},
 {n:"Waiting on God", i:"⏳", d:"Strength for the meantime", r:["Psalms 27:14","Isaiah 40:31","Lamentations 3:25-26","Psalms 130:5-6","Habakkuk 2:3","Micah 7:7","Psalms 37:7"]},
 {n:"Doubt & Assurance", i:"🌗", d:"Help my unbelief", r:["Mark 9:24","John 20:27-29","Jude 1:22","James 1:6","1 John 5:13","Romans 8:38-39","2 Timothy 1:12"]},
 {n:"Rest & Sabbath", i:"🛏️", d:"Come to me, all who labor", r:["Matthew 11:28-30","Psalms 23:2-3","Exodus 20:8-10","Mark 2:27","Psalms 62:1-2","Hebrews 4:9-11","Genesis 2:2-3"]},
 {n:"Decision-Making", i:"🧭", d:"Paths made straight", r:["Proverbs 3:5-6","James 1:5","Psalms 32:8","Proverbs 16:3","Proverbs 16:9","Isaiah 30:21","Psalms 25:4-5","Proverbs 15:22"]},
 {n:"Peace & Comfort", i:"🕯️", d:"Rest for weary hearts", r:["Philippians 4:6-7","John 14:27","Isaiah 26:3","Psalms 23:1-4","Matthew 11:28-30","Psalms 34:18","Isaiah 40:1","Psalms 4:8","John 16:33"]},
 {n:"Courage & Fear Not", i:"🦁", d:"Strength in God's presence", r:["Joshua 1:9","Isaiah 41:10","Deuteronomy 31:6","Psalms 27:1","Psalms 56:3","2 Timothy 1:7","Psalms 118:6","Isaiah 41:13","John 14:27","1 Chronicles 28:20"]}
]},
{g:"Character & Growth", t:[
 {n:"Perseverance", i:"🏃", d:"Running the race to the end", r:["Galatians 6:9","Hebrews 12:1-2","James 1:12","Romans 12:12","1 Corinthians 15:58","Philippians 3:13-14","2 Timothy 4:7","Hebrews 10:36","Revelation 3:11","2 Thessalonians 3:13"]},
 {n:"Faith", i:"🌱", d:"Assurance of things hoped for", r:["Hebrews 11:1","Hebrews 11:6","Romans 10:17","2 Corinthians 5:7","Matthew 17:20","Mark 11:22-24","Ephesians 2:8-9","James 2:17","Galatians 2:20","Habakkuk 2:4"]},
 {n:"Love", i:"❤️", d:"The greatest of these", r:["1 Corinthians 13:4-7","John 3:16","1 John 4:7-8","1 John 4:19","Romans 8:38-39","John 15:12-13","1 Peter 4:8","Deuteronomy 6:5","Mark 12:30-31","Song of Songs 8:7"]},
 {n:"Humility", i:"🌾", d:"He must increase", r:["Philippians 2:3-8","Proverbs 22:4","James 4:10","Micah 6:8","1 Peter 5:5-6","Proverbs 27:2","Luke 14:11"]},
 {n:"Self-Control & Anger", i:"🌊", d:"Slow to wrath", r:["Proverbs 16:32","Ephesians 4:26-27","James 1:19-20","Proverbs 15:1","Proverbs 29:11","Galatians 5:22-23","Psalms 4:4"]},
 {n:"The Power of Words", i:"👅", d:"Life and death in the tongue", r:["Proverbs 18:21","Ephesians 4:29","James 3:5-6","Proverbs 15:4","Colossians 4:6","Psalms 141:3","Proverbs 12:18","Matthew 12:36-37"]},
 {n:"Honesty & Integrity", i:"⚖️", d:"Walking securely", r:["Proverbs 10:9","Proverbs 11:3","Psalms 15:1-2","Proverbs 12:22","Luke 16:10","Ephesians 4:25","Proverbs 20:7"]},
 {n:"Gratitude", i:"🍞", d:"In everything give thanks", r:["1 Thessalonians 5:18","Psalms 100:4","Psalms 107:1","Colossians 3:15-17","Psalms 118:1","Ephesians 5:20","Psalms 136:1"]},
 {n:"Patience", i:"🌳", d:"Fruit that ripens slowly", r:["Romans 12:12","Galatians 6:9","James 5:7-8","Proverbs 14:29","Ecclesiastes 7:8","Colossians 3:12","Psalms 37:7"]},
 {n:"Work & Diligence", i:"🔨", d:"As unto the Lord", r:["Colossians 3:23-24","Proverbs 6:6-8","Proverbs 14:23","Ecclesiastes 9:10","Proverbs 12:24","Proverbs 22:29","1 Corinthians 10:31"]},
 {n:"Generosity & Money", i:"🎁", d:"A cheerful giver", r:["2 Corinthians 9:6-7","Proverbs 11:25","Acts 20:35","Matthew 6:19-21","1 Timothy 6:10","Proverbs 3:9-10","Luke 6:38","Malachi 3:10"]},
 {n:"Friendship", i:"🤝", d:"Iron sharpens iron", r:["Proverbs 17:17","Proverbs 27:17","Ecclesiastes 4:9-10","John 15:13","Proverbs 18:24","Proverbs 27:9","1 Samuel 18:1"]},
 {n:"Servanthood", i:"🧺", d:"Greatness through serving", r:["Mark 10:43-45","John 13:12-15","Galatians 5:13","Philippians 2:5-7","Matthew 25:40","1 Peter 4:10","Joshua 24:15"]},
 {n:"Fruit of the Spirit", i:"🍇", d:"Life grown by the Spirit", r:["Galatians 5:22-23","John 15:4-5","Ephesians 5:8-9","Colossians 3:12-14","Philippians 1:9-11","Matthew 7:16-20","Psalms 1:1-3","James 3:17","2 Peter 1:5-8"]},
 {n:"Identity in Christ", i:"👑", d:"Who God says you are", r:["2 Corinthians 5:17","Galatians 2:20","1 Peter 2:9","Ephesians 2:10","John 1:12","Romans 8:16-17","Colossians 3:3","Psalms 139:13-14","Genesis 1:27","Galatians 3:26"]},
 {n:"Name Change", i:"📛", d:"New names, new callings", r:["Genesis 17:5","Genesis 17:15","Genesis 32:28","Genesis 35:10","Isaiah 62:2","Matthew 16:17-18","John 1:42","Acts 13:9","Revelation 2:17","Revelation 3:12"]},
 {n:"Holiness & Purity", i:"❄️", d:"Create in me a clean heart", r:["1 Peter 1:15-16","Psalms 51:10","Matthew 5:8","2 Timothy 2:22","1 Thessalonians 4:7","Psalms 24:3-4","Hebrews 12:14"]},
 {n:"Obedience", i:"👣", d:"If you love me…", r:["John 14:15","Deuteronomy 28:1-2","1 Samuel 15:22","James 1:22","Luke 11:28","John 15:10","Joshua 1:8"]}
]},
{g:"God & His Nature", t:[
 {n:"God's Faithfulness", i:"🌄", d:"New every morning", r:["Lamentations 3:22-23","Deuteronomy 7:9","Psalms 36:5","2 Timothy 2:13","1 Corinthians 1:9","Psalms 89:1-2","Hebrews 10:23","Numbers 23:19"]},
 {n:"God's Promises", i:"🌈", d:"Yes and amen", r:["2 Corinthians 1:20","Joshua 21:45","2 Peter 1:4","1 Kings 8:56","Psalms 145:13","Isaiah 55:10-11","Hebrews 10:23"]},
 {n:"God's Sovereignty", i:"♾️", d:"His purposes stand", r:["Proverbs 19:21","Isaiah 46:9-10","Romans 8:28","Daniel 4:35","Psalms 115:3","Job 42:2","Ephesians 1:11","Proverbs 21:1"]},
 {n:"The Good Shepherd", i:"🐑", d:"He leads, he restores", r:["Psalms 23:1-3","John 10:11","John 10:14-15","Isaiah 40:11","Ezekiel 34:11-12","Psalms 100:3","1 Peter 2:25"]},
 {n:"Creation & Wonder", i:"🌌", d:"The heavens declare", r:["Genesis 1:1","Psalms 19:1","Psalms 8:3-4","Romans 1:20","Colossians 1:16-17","Psalms 139:13-14","Isaiah 40:26","Job 38:4"]},
 {n:"Light & Darkness", i:"💡", d:"The light shines on", r:["Psalms 27:1","John 8:12","1 John 1:5-7","Matthew 5:14-16","Isaiah 9:2","John 1:4-5","Psalms 119:105","Ephesians 5:8"]},
 {n:"The Holy Spirit", i:"🕊️", d:"The Helper within", r:["John 14:26","Acts 1:8","Romans 8:26","Galatians 5:22-23","John 16:13","Acts 2:38","Romans 15:13"]},
 {n:"God's Word", i:"📖", d:"Living and active", r:["Psalms 119:105","2 Timothy 3:16-17","Hebrews 4:12","Isaiah 40:8","Matthew 4:4","Joshua 1:8","Psalms 19:7-8","Romans 10:17"]},
 {n:"Strength", i:"💪", d:"Power in weakness", r:["Philippians 4:13","Isaiah 40:29-31","Psalms 46:1","Nehemiah 8:10","Exodus 15:2","Psalms 28:7","2 Corinthians 12:9","Ephesians 6:10","Habakkuk 3:19"]},
 {n:"Wisdom & Guidance", i:"🦉", d:"The way to walk in", r:["Proverbs 3:5-6","James 1:5","Psalms 119:105","Isaiah 30:21","Proverbs 2:6","Psalms 32:8","Proverbs 16:9","Psalms 25:4-5","Proverbs 9:10"]}
]},
{g:"Jesus & the Gospel", t:[
 {n:"Salvation & Grace", i:"✝️", d:"The gift of God", r:["Ephesians 2:8-9","John 3:16-17","Romans 6:23","Romans 10:9-10","Titus 3:4-5","Acts 4:12","2 Corinthians 5:17","Romans 5:8","John 1:12","1 Timothy 1:15"]},
 {n:"The 'I Am' Sayings", i:"🌾", d:"Jesus in his own words", r:["John 6:35","John 8:12","John 10:9","John 10:11","John 11:25","John 14:6","John 15:5","John 8:58"]},
 {n:"Prophecies of Messiah", i:"⭐", d:"Foretold long before", r:["Isaiah 7:14","Isaiah 9:6","Micah 5:2","Isaiah 53:3-5","Zechariah 9:9","Psalms 22:16-18","Isaiah 11:1-2","Jeremiah 23:5"]},
 {n:"The Cross & Resurrection", i:"🌅", d:"Death defeated", r:["1 Corinthians 15:3-4","Romans 5:8","1 Peter 2:24","Isaiah 53:5","Matthew 28:5-6","John 19:30","Romans 6:4","1 Corinthians 15:55-57"]},
 {n:"Compassion of Jesus", i:"🫶", d:"Moved with compassion", r:["Matthew 9:36","Matthew 14:14","Luke 7:13","Mark 1:41","John 11:35","Matthew 15:32","Luke 19:41","Hebrews 4:15"]},
 {n:"Second Coming & Heaven", i:"🌃", d:"A place prepared", r:["John 14:2-3","Revelation 21:1-4","1 Thessalonians 4:16-17","Matthew 24:42","Titus 2:13","Revelation 22:12","Philippians 3:20-21","1 Corinthians 2:9"]},
 {n:"New Creation", i:"🦋", d:"Behold, I make all things new", r:["2 Corinthians 5:17","Ezekiel 36:26","Revelation 21:5","Romans 12:2","Galatians 6:15","Ephesians 4:22-24","Colossians 3:9-10","Isaiah 43:18-19"]},
 {n:"Repentance", i:"💧", d:"Turning back to God", r:["Acts 3:19","1 John 1:9","2 Chronicles 7:14","Joel 2:12-13","Luke 15:7","Psalms 51:10-12","Acts 2:38","James 4:8-10","Ezekiel 36:26","Isaiah 55:7"]},
 {n:"Forgiveness", i:"🕊️", d:"Mercy received and extended", r:["1 John 1:9","Ephesians 4:32","Colossians 3:13","Matthew 6:14-15","Psalms 103:12","Isaiah 1:18","Micah 7:18-19","Matthew 18:21-22","Isaiah 43:25","Psalms 32:5"]}
]},
{g:"Church & Mission", t:[
 {n:"Prayer", i:"🙏", d:"Drawing near to God", r:["Philippians 4:6","Matthew 6:9-13","1 Thessalonians 5:16-18","James 5:16","Matthew 7:7-8","Psalms 145:18","Jeremiah 33:3","Mark 11:24","Romans 8:26","1 John 5:14"]},
 {n:"Joy", i:"☀️", d:"Gladness in every season", r:["Psalms 16:11","Nehemiah 8:10","John 15:11","Psalms 118:24","Romans 15:13","James 1:2","Psalms 30:5","Isaiah 55:12","Philippians 4:4","Zephaniah 3:17"]},
 {n:"Unity & Fellowship", i:"🫂", d:"How good to dwell together", r:["Psalms 133:1","Ephesians 4:3","John 17:20-21","Acts 2:42","1 Corinthians 12:12","Colossians 3:14","Hebrews 10:24-25","Romans 12:4-5"]},
 {n:"Evangelism & Mission", i:"🌍", d:"Go and make disciples", r:["Matthew 28:19-20","Acts 1:8","Romans 1:16","Mark 16:15","1 Peter 3:15","Matthew 5:16","Romans 10:14-15","Isaiah 6:8"]},
 {n:"Justice & Mercy", i:"🕊️", d:"Do justly, love mercy", r:["Micah 6:8","Isaiah 1:17","Amos 5:24","Proverbs 31:8-9","Zechariah 7:9-10","Psalms 82:3","Matthew 23:23"]},
 {n:"Caring for the Poor", i:"🍲", d:"Whatever you did for the least", r:["Proverbs 19:17","Matthew 25:35-40","James 2:15-16","1 John 3:17-18","Deuteronomy 15:11","Proverbs 14:31","Isaiah 58:10"]},
 {n:"Marriage & Family", i:"🏡", d:"A cord of three strands", r:["Genesis 2:24","Ecclesiastes 4:12","1 Corinthians 13:4-7","Ephesians 5:25","Proverbs 31:10","Joshua 24:15","Proverbs 18:22"]},
 {n:"Children & Parenting", i:"👶", d:"Train up a child", r:["Proverbs 22:6","Psalms 127:3-5","Deuteronomy 6:6-7","Ephesians 6:1-4","Proverbs 29:17","Matthew 19:14","3 John 1:4"]},
 {n:"Spiritual Warfare", i:"🛡️", d:"Stand therefore", r:["Ephesians 6:10-13","James 4:7","2 Corinthians 10:3-5","1 Peter 5:8-9","1 John 4:4","Romans 16:20","Psalms 144:1"]}
]}];
const ALLTOPICS=[];TGROUPS.forEach(g=>g.t.forEach(t=>{t._ix=ALLTOPICS.length;ALLTOPICS.push(t);}));

/* ---------- LAYERED STORAGE (Capacitor → artifact → IndexedDB → localStorage → memory) ---------- */
const Store={
  mode:"memory", mem:{}, notice:"", p:null, db:null,
  openDB(){return new Promise((resolve,reject)=>{
    if(!window.indexedDB)return reject(new Error("IndexedDB unavailable"));
    const req=indexedDB.open("lamplight",1);
    req.onupgradeneeded=()=>{if(!req.result.objectStoreNames.contains("kv"))req.result.createObjectStore("kv");};
    req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||new Error("IndexedDB failed"));
  });},
  idbGet(k){return new Promise((resolve,reject)=>{const r=this.db.transaction("kv","readonly").objectStore("kv").get(k);r.onsuccess=()=>resolve(r.result??null);r.onerror=()=>reject(r.error);});},
  idbSet(k,v){return new Promise((resolve,reject)=>{const tx=this.db.transaction("kv","readwrite");tx.objectStore("kv").put(v,k);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error);});},
  idbRemove(k){return new Promise((resolve,reject)=>{const tx=this.db.transaction("kv","readwrite");tx.objectStore("kv").delete(k);tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});},
  async init(){
    try{
      const prefs=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Preferences;
      if(prefs){await prefs.keys();this.p=prefs;this.mode="capacitor";return;}
    }catch(e){}
    try{
      if(window.storage&&typeof window.storage.get==="function"){this.mode="artifact";return;}
    }catch(e){}
    try{
      this.db=await this.openDB();this.mode="indexeddb";
      for(const k of ["lamplight5","lamplight4","lamplight3","lamplight2-progress","lamplight5-corrupt-recovery"]){
        if(await this.idbGet(k)!==null)continue;
        let legacy=null;try{legacy=localStorage.getItem(k);}catch(e){}
        if(legacy!==null){await this.idbSet(k,legacy);try{localStorage.removeItem(k);}catch(e){}}
      }
      return;
    }catch(e){}
    try{
      localStorage.setItem("__ll","1");localStorage.removeItem("__ll");
      this.mode="local";return;
    }catch(e){}
    this.mode="memory";
  },
  async fallback(from,error){
    const prior=from||this.mode;
    if(prior!=="indexeddb"){
      try{
        this.db=this.db||await this.openDB();this.mode="indexeddb";
        this.notice="Saving switched from "+prior+" to the browser database after a storage error.";
        setTimeout(()=>{if(typeof toast==="function")toast(this.notice);},0);return;
      }catch(e){}
    }
    if(prior!=="local"){
      try{
        localStorage.setItem("__ll","1");localStorage.removeItem("__ll");
        this.mode="local";
        this.notice="Saving switched from "+prior+" to browser storage after a storage error.";
        setTimeout(()=>{if(typeof toast==="function")toast(this.notice);},0);
        return;
      }catch(e){}
    }
    this.mode="memory";
    this.notice="Persistent storage failed. Progress is being kept in memory only; export a backup before closing.";
    setTimeout(()=>{if(typeof toast==="function")toast(this.notice);},0);
  },
  async get(k){
    try{
      if(this.mode==="capacitor"){const r=await this.p.get({key:k});return r?r.value:null;}
      if(this.mode==="artifact"){const r=await window.storage.get(k);return r?r.value:null;}
      if(this.mode==="indexeddb")return await this.idbGet(k);
      if(this.mode==="local")return localStorage.getItem(k);
    }catch(e){await this.fallback(this.mode,e);}
    if(this.mode==="indexeddb")try{return await this.idbGet(k);}catch(e){await this.fallback("indexeddb",e);}
    if(this.mode==="local")try{return localStorage.getItem(k);}catch(e){}
    return this.mem[k]!==undefined?this.mem[k]:null;
  },
  async set(k,v){
    const attempted=this.mode;
    try{
      if(attempted==="capacitor"){await this.p.set({key:k,value:v});return true;}
      if(attempted==="artifact"){await window.storage.set(k,v);return true;}
      if(attempted==="indexeddb"){await this.idbSet(k,v);return true;}
      if(attempted==="local"){localStorage.setItem(k,v);return true;}
    }catch(e){await this.fallback(attempted,e);}
    if(this.mode==="indexeddb"){
      try{await this.idbSet(k,v);return true;}catch(e){await this.fallback("indexeddb",e);}
    }
    if(this.mode==="local"){
      try{localStorage.setItem(k,v);return true;}catch(e){await this.fallback("local",e);}
    }
    this.mem[k]=v;return false;
  },
  async remove(k){
    try{
      if(this.mode==="capacitor")return void await this.p.remove({key:k});
      if(this.mode==="artifact")return void (window.storage.delete?await window.storage.delete(k):await window.storage.set(k,""));
      if(this.mode==="indexeddb")return void await this.idbRemove(k);
      if(this.mode==="local")return void localStorage.removeItem(k);
    }catch(e){await this.fallback(this.mode,e);}
    if(this.mode==="indexeddb")try{return void await this.idbRemove(k);}catch(e){await this.fallback("indexeddb",e);}
    if(this.mode==="local")try{return void localStorage.removeItem(k);}catch(e){}
    delete this.mem[k];
  }
};

/* ---------- SRS ENGINE (Leitner ladder on passage units) ---------- */
const INTERVALS=[1,2,4,7,14,30];
const MAXLVL=5, PROFILE_VERSION=5, STORAGE_KEY="lamplight5", CORRUPT_RECOVERY_KEY="lamplight5-corrupt-recovery";
const MAX_SETS=100,MAX_SET_UNITS=5000,MAX_TOTAL_UNITS=40000,MAX_UNIT_KEY_CHARS=32;
const MAX_COUNTER=1_000_000_000,MAX_STREAK=100_000,MAX_PRACTICE_OFFSET=100_000,MAX_BACKUP_CHARS=10_000_000;
function dateToken(d){
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function todayStr(off=0){const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+off);return dateToken(d);}
function validDateToken(s){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(s||""))return false;
  const[y,m,d]=s.split("-").map(Number),x=new Date(y,m-1,d,12);
  return x.getFullYear()===y&&x.getMonth()===m-1&&x.getDate()===d;
}
function addCalendarDays(token,days){
  const[y,m,d]=token.split("-").map(Number),x=new Date(y,m-1,d,12);
  x.setDate(x.getDate()+days);return dateToken(x);
}
function dueFromLegacy(s){
  if(s&&validDateToken(s.due))return s.due;
  if(s&&Number.isFinite(Number(s.d)))return dateToken(new Date(Number(s.d)));
  return todayStr();
}

let BIBLE=null,BOOKNAME2IX={},FLAT=null;
function freshProfile(seenIntro=false){return{
  v:PROFILE_VERSION,oil:0,plays:0,lampLevel:0,srs:{},sets:[],active:0,
  streak:{count:0,best:0,last:null},practice:{blanks:{},builder:{}},seenIntro
};}
let P=freshProfile(false);
const app=document.getElementById("app");
const OT_COUNT=39;

const lvl=k=>(P.srs[k]&&P.srs[k].l)||0;
function isDue(k){const s=P.srs[k];return !s||dueFromLegacy(s)<=todayStr();}
function gradeUp(k){
  const s=P.srs[k]||{l:0},before=Math.max(0,Math.min(MAXLVL,Number(s.l)||0));
  const days=INTERVALS[before];s.l=Math.min(MAXLVL,before+1);s.due=addCalendarDays(todayStr(),days);delete s.d;
  P.srs[k]=s;return{level:s.l,days};
}
function gradeDown(k){
  const s=P.srs[k]||{l:0};s.l=Math.max(0,(Number(s.l)||0)-1);s.due=addCalendarDays(todayStr(),1);delete s.d;
  P.srs[k]=s;return{level:s.l,days:1};
}
function gradeHint(k){
  const s=P.srs[k]||{l:0};s.l=Math.max(0,Math.min(MAXLVL,Number(s.l)||0));s.due=addCalendarDays(todayStr(),1);delete s.d;
  P.srs[k]=s;return{level:s.l,days:1};
}
function allUnits(){const u=new Set();P.sets.forEach(s=>s.units.forEach(k=>u.add(k)));return[...u];}
function dueUnits(){return allUnits().filter(isDue);}
function learnedCount(){return allUnits().filter(k=>lvl(k)>=MAXLVL).length;}
function markActive(){
  const t=todayStr();
  if(P.streak.last===t)return;
  P.streak.count=(P.streak.last===todayStr(-1))?Math.min(MAX_STREAK,P.streak.count+1):1;
  P.streak.best=Math.min(MAX_STREAK,Math.max(P.streak.best,P.streak.count));
  P.streak.last=t;
}

/* ---------- LOAD / MIGRATE / SAVE ---------- */
const isObj=o=>!!o&&typeof o==="object"&&!Array.isArray(o);
function validId(id){
  if(typeof id!=="string"||!/^\d+:\d+:\d+$/.test(id))return false;
  const{bi,ci,vi}=idParts(id),bk=BIBLE&&BIBLE.b[bi];
  return !!(bk&&bk.c[ci]&&typeof bk.c[ci][vi]==="string");
}
function validUnitKey(k){
  if(typeof k!=="string"||k.length>MAX_UNIT_KEY_CHARS)return false;
  const p=k.split("~");if(p.length>2||!validId(p[0])||(p[1]&&!validId(p[1])))return false;
  if(p[1]){const a=idParts(p[0]),b=idParts(p[1]);if(a.bi!==b.bi||compareId(a,b)>0)return false;}
  try{return uids(k).length>0&&uids(k).length<=500;}catch(e){return false;}
}
function normalizedState(s,strict=false){
  if(!isObj(s))throw new Error("Each memory record must be an object.");
  const l=Number(s.l);if(!Number.isInteger(l)||l<0||l>MAXLVL)throw new Error("A memory level is outside 0–5.");
  if(strict&&!validDateToken(s.due))throw new Error("A due date is missing or invalid.");
  const due=dueFromLegacy(s);if(!validDateToken(due))throw new Error("A due date is invalid.");
  return{l,due};
}
function normalizeProfile(raw,{sourceVersion,strict=false}={}){
  if(!isObj(raw))throw new Error("The profile is not an object.");
  const ver=Number(sourceVersion||raw.v||4);
  if(![3,4,5].includes(ver))throw new Error("This backup version is not supported.");
  const setsRaw=raw.sets;if(!Array.isArray(setsRaw)||!setsRaw.length||setsRaw.length>MAX_SETS)throw new Error("Study sets are missing or too numerous.");
  const sets=setsRaw.map((s,ix)=>{
    if(!isObj(s))throw new Error("Study set "+(ix+1)+" is invalid.");
    const name=String(s.name||"").trim();if(!name||name.length>80)throw new Error("A study-set name is missing or too long.");
    const units=s.units||s.verses;if(!Array.isArray(units)||units.length>MAX_SET_UNITS)throw new Error("A study set has invalid passages.");
    const clean=[];for(const k of units){if(!validUnitKey(k))throw new Error("A passage identifier is invalid.");if(!clean.includes(k))clean.push(k);}
    if(strict){const owned=new Set();for(const k of clean)for(const id of uids(k)){if(owned.has(id))throw new Error("A study set contains overlapping review units.");owned.add(id);}}
    return{name,units:clean};
  });
  if(sets.reduce((total,set)=>total+set.units.length,0)>MAX_TOTAL_UNITS)throw new Error("The profile contains too many passages across its study sets.");
  const srs={};if(raw.srs!==undefined&&!isObj(raw.srs))throw new Error("Memory progress is invalid.");
  const srsEntries=Object.entries(raw.srs||{});if(srsEntries.length>MAX_TOTAL_UNITS)throw new Error("The profile contains too many memory records.");
  for(const[k,s]of srsEntries){if(!validUnitKey(k))throw new Error("A memory passage identifier is invalid.");srs[k]=normalizedState(s,strict&&ver===PROFILE_VERSION);}
  const num=(v,label,max=MAX_COUNTER)=>{const n=Number(v||0);if(!Number.isFinite(n)||n<0||n>max)throw new Error(label+" is invalid.");return Math.floor(n);};
  const streak=isObj(raw.streak)?raw.streak:{};
  const practice={blanks:{},builder:{}};
  if(raw.practice!==undefined&&!isObj(raw.practice))throw new Error("Practice rotation data is invalid.");
  for(const mode of ["blanks","builder"]){
    const src=isObj(raw.practice&&raw.practice[mode])?raw.practice[mode]:{};
    const entries=Object.entries(src);if(entries.length>MAX_TOTAL_UNITS)throw new Error("The profile contains too many practice records.");
    for(const[k,v]of entries){
      if(!validUnitKey(k)||!Number.isInteger(Number(v))||Number(v)<0||Number(v)>MAX_PRACTICE_OFFSET)throw new Error("Practice rotation data is invalid.");
      practice[mode][k]=Number(v);
    }
  }
  const out={v:PROFILE_VERSION,oil:num(raw.oil,"Oil"),plays:num(raw.plays,"Play count"),lampLevel:num(raw.lampLevel,"Lamp glow",5),
    srs,sets,active:num(raw.active,"Active set",Math.max(0,sets.length-1)),
    streak:{count:num(streak.count,"Streak",MAX_STREAK),best:num(streak.best,"Best streak",MAX_STREAK),last:streak.last||null},practice,seenIntro:!!raw.seenIntro};
  if(out.streak.last!==null&&!validDateToken(out.streak.last))throw new Error("The streak date is invalid.");
  if(out.streak.best<out.streak.count)out.streak.best=out.streak.count;
  if(!sets.length)out.active=0;
  if(ver===3)collapseStarterPassages(out);
  if(ver<PROFILE_VERSION)collapseLegacyOverlaps(out);
  return out;
}
function conservativeStateForUnit(target,sources=[]){
  const states=uids(target).map(id=>{
    if(P.srs[id])return normalizedState(P.srs[id]);
    const owner=sources.find(k=>P.srs[k]&&uids(k).includes(id));
    return owner?normalizedState(P.srs[owner]):null;
  });
  if(states.some(s=>!s))return{l:0,due:todayStr()};
  return{l:Math.min(...states.map(s=>s.l)),due:states.map(s=>s.due).sort()[0]};
}
function collapseStarterPassages(profile){
  const prior=P;P=profile;
  const starters=ALLTOPICS[0].r.map(refUnit).filter(Boolean);
  for(const set of profile.sets){
    const units=new Set(set.units);
    for(const pk of starters){
      const ids=uids(pk);if(ids.length<2||units.has(pk)||!ids.every(id=>units.has(id)))continue;
      const states=ids.map(id=>profile.srs[id]).filter(Boolean).map(s=>normalizedState(s));
      ids.forEach(id=>units.delete(id));units.add(pk);
      profile.srs[pk]=states.length===ids.length
        ?{l:Math.min(...states.map(s=>s.l)),due:states.map(s=>s.due).sort()[0]}
        :{l:0,due:todayStr()};
    }
    set.units=[...units];
  }
  P=prior;
}
function collapseLegacyOverlaps(profile){
  for(const set of profile.sets){
    let changed=true;
    while(changed){changed=false;
      outer:for(let i=0;i<set.units.length;i++)for(let j=i+1;j<set.units.length;j++){
        const a=set.units[i],b=set.units[j],rel=unitRelation(a,b);if(rel==="none")continue;
        let merged;if(rel==="a-in-b")merged=b;else if(rel==="b-in-a"||rel==="equal")merged=a;
        else{const ids=[...new Set([...uids(a),...uids(b)])].sort((x,y)=>compareId(idParts(x),idParts(y)));merged=ukey(ids);}
        const states=[profile.srs[a],profile.srs[b]].filter(Boolean).map(s=>normalizedState(s));
        const mergedState=states.length===2?{l:Math.min(states[0].l,states[1].l),due:[states[0].due,states[1].due].sort()[0]}:{l:0,due:todayStr()};
        set.units.splice(j,1);set.units.splice(i,1,merged);profile.srs[merged]=mergedState;changed=true;break outer;
      }
    }
  }
}
let corruptProfileRecovery=null,corruptProfileWarning="";
function corruptRecoveryEntries(){
  if(!corruptProfileRecovery)return[];
  try{
    const saved=JSON.parse(corruptProfileRecovery);
    if(Array.isArray(saved.entries))return saved.entries.filter(entry=>isObj(entry)&&typeof entry.raw==="string");
    if(saved&&saved.format==="lamplight-corrupt-profile"&&typeof saved.raw==="string")return[{
      detectedAt:saved.detectedAt||null,sourceKey:saved.sourceKey||STORAGE_KEY,schema:saved.schema??PROFILE_VERSION,
      reason:saved.reason||"Previously preserved invalid profile data",raw:saved.raw
    }];
  }catch(e){}
  return[{detectedAt:null,sourceKey:CORRUPT_RECOVERY_KEY,schema:"unknown",reason:"Earlier recovery data could not be decoded",raw:String(corruptProfileRecovery)}];
}
async function quarantineCorruptProfile(raw,error,sourceKey=STORAGE_KEY,schema=PROFILE_VERSION){
  const detectedAt=new Date().toISOString(),reason=sourceKey+" (schema "+schema+"): "+String(error&&error.message||"Invalid profile data");
  const entry={detectedAt,sourceKey,schema,reason,raw:String(raw)},entries=corruptRecoveryEntries();
  if(!entries.some(old=>old.sourceKey===entry.sourceKey&&old.raw===entry.raw))entries.push(entry);
  const first=entries[0];
  const recovery=JSON.stringify({format:"lamplight-corrupt-profile",version:1,detectedAt:first.detectedAt||detectedAt,
    sourceKey:first.sourceKey,schema:first.schema,reason:first.reason,raw:first.raw,entries},null,2);
  corruptProfileRecovery=recovery;
  corruptProfileWarning="Lamplight found unreadable saved progress. The original data was preserved in a recovery file before a safe profile was opened.";
  try{await Store.set(CORRUPT_RECOVERY_KEY,recovery);}catch(e){}
}
function downloadCorruptRecovery(){
  if(!corruptProfileRecovery){toast("No recovery copy is available on this device");return;}
  downloadBackupFile(corruptProfileRecovery,"corrupt-profile-recovery");
}
async function loadP(){
  try{
    const priorRecovery=await Store.get(CORRUPT_RECOVERY_KEY);
    if(priorRecovery){
      corruptProfileRecovery=priorRecovery;
      corruptProfileWarning="Lamplight previously preserved unreadable progress on this device. Download the recovery copy before resetting data.";
    }
  }catch(e){}
  for(const [key,schema,strict]of [[STORAGE_KEY,PROFILE_VERSION,true],["lamplight4",4,false],["lamplight3",3,false]]){
    let raw=null;try{raw=await Store.get(key);}catch(e){}
    if(!raw)continue;
    try{P=normalizeProfile(JSON.parse(raw),{sourceVersion:schema,strict});if(key!==STORAGE_KEY)await saveP({immediate:true});return;}
    catch(e){await quarantineCorruptProfile(raw,e,key,schema);}
  }
  let legacy=null;try{legacy=await Store.get("lamplight2-progress");}catch(e){}
  if(legacy){
    try{
      const o=JSON.parse(legacy);if(!isObj(o))throw new Error("The legacy profile is not an object.");
      const units=o.set===undefined?[]:o.set,mastery=o.mastery===undefined?{}:o.mastery;
      if(!Array.isArray(units)||units.length>MAX_SET_UNITS||units.some(id=>!validUnitKey(id)))throw new Error("Legacy passages are invalid.");
      if(!isObj(mastery))throw new Error("Legacy mastery is invalid.");
      for(const[id,level]of Object.entries(mastery))if(!validUnitKey(id)||!Number.isInteger(Number(level))||Number(level)<0||Number(level)>MAXLVL)throw new Error("A legacy mastery record is invalid.");
      const oil=Number(o.oil||0),plays=Number(o.plays||0);if(!Number.isFinite(oil)||oil<0||!Number.isFinite(plays)||plays<0)throw new Error("Legacy totals are invalid.");
      P=freshProfile(true);P.oil=Math.floor(oil);P.plays=Math.floor(plays);P.sets=[{name:"My Study Set",units:[...new Set(units)]}];
      Object.entries(mastery).forEach(([id,level])=>{P.srs[id]={l:Number(level),due:todayStr()};});
      await saveP({immediate:true});return;
    }catch(e){await quarantineCorruptProfile(legacy,e,"lamplight2-progress",2);}
  }
}
function compactProfileRecords(profile=P){
  const live=new Set((profile.sets||[]).flatMap(set=>set.units||[]));
  for(const key of Object.keys(profile.srs||{}))if(!live.has(key))delete profile.srs[key];
  for(const mode of ["blanks","builder"])for(const key of Object.keys(profile.practice&&profile.practice[mode]||{}))if(!live.has(key))delete profile.practice[mode][key];
  profile.oil=Math.min(MAX_COUNTER,Math.max(0,Math.floor(Number(profile.oil)||0)));
  profile.plays=Math.min(MAX_COUNTER,Math.max(0,Math.floor(Number(profile.plays)||0)));
  if(profile.streak){profile.streak.count=Math.min(MAX_STREAK,Math.max(0,Math.floor(Number(profile.streak.count)||0)));profile.streak.best=Math.min(MAX_STREAK,Math.max(profile.streak.count,Math.floor(Number(profile.streak.best)||0)));}
  return profile;
}
let saveTimer=null,saveChain=Promise.resolve(),pendingSnapshot=null;
function saveP(options={}){
  P.v=PROFILE_VERSION;compactProfileRecords(P);pendingSnapshot=JSON.stringify(P);clearTimeout(saveTimer);
  if(options.immediate)return flushSave();
  saveTimer=setTimeout(flushSave,120);return saveChain;
}
function flushSave(){
  clearTimeout(saveTimer);saveTimer=null;if(!pendingSnapshot)return saveChain;
  const snapshot=pendingSnapshot;pendingSnapshot=null;
  saveChain=saveChain.then(()=>Store.set(STORAGE_KEY,snapshot)).catch(()=>false);
  return saveChain;
}

/* ---------- BOOT ---------- */
async function boot(){
  try{
    await Store.init();
    BIBLE=BIBLE_DATA;
    BIBLE.b.forEach((bk,i)=>{BOOKNAME2IX[bk.n.toLowerCase()]=i;});
    BOOKNAME2IX["psalm"]=BOOKNAME2IX["psalms"];
    BOOKNAME2IX["song of solomon"]=BOOKNAME2IX["song of songs"];
    initBookAliases();
    await loadP();
    if(!P.sets.length){
      P.sets=[{name:"Canon Starter",units:ALLTOPICS[0].r.map(refUnit).filter(Boolean)}];
      P.active=0;saveP();
    }
    if(P.active>=P.sets.length)P.active=0;
    initRouter();
    document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")flushSave();});
    window.addEventListener("pagehide",flushSave);
    home();
  }catch(e){
    document.getElementById("loadbox").innerHTML="<p>Could not load the Bible text: "+e.message+"</p>";
  }
}

/* ---------- ROUTER (browser + Android hardware back) ---------- */
let STACK=[],viewTimers=new Set(),viewEpoch=0,ACTIVE_PRACTICE_MODE=null,PRACTICE_EXIT_ARMED=false;
function later(fn,delay){
  const epoch=viewEpoch,id=setTimeout(()=>{viewTimers.delete(id);if(epoch===viewEpoch)fn();},delay);
  viewTimers.add(id);return id;
}
function cancelViewTimers(){viewTimers.forEach(clearTimeout);viewTimers.clear();viewEpoch++;}
function initRouter(){
  history.replaceState({d:0},"");
  window.addEventListener("popstate",()=>{
    if(ACTIVE_PRACTICE_MODE&&!PRACTICE_EXIT_ARMED&&practiceInProgress(ACTIVE_PRACTICE_MODE)){
      history.pushState({d:STACK.length},"");
      requestPracticeExit(ACTIVE_PRACTICE_MODE);return;
    }
    PRACTICE_EXIT_ARMED=false;ACTIVE_PRACTICE_MODE=null;
    STACK.pop();
    const top=STACK[STACK.length-1];
    (top||home)._fn?(top._fn)():(top||homeRender)();
  });
  // Capacitor hardware back (if the App plugin is present)
  try{
    const A=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.App;
    if(A&&A.addListener){
      A.addListener("backButton",()=>{if(STACK.length>0)history.back();else if(A.exitApp){flushSave().finally(()=>A.exitApp());}});
      A.addListener("appStateChange",state=>{if(state&&!state.isActive)flushSave();});
    }
  }catch(e){}
}
function nav(fn){ // push a screen deeper
  STACK.push(fn);history.pushState({d:STACK.length},"");fn();
}
function home(){ // reset to root
  if(STACK.length){history.go(-STACK.length);STACK=[];}
  homeRender();
}
function show(html,focusSel){
  cancelViewTimers();
  document.getElementById("practice-leave-dialog")?.remove();
  app.innerHTML=html;
  window.scrollTo(0,0);
  const f=document.querySelector(focusSel||".screen-title");
  if(f){f.setAttribute("tabindex","-1");f.focus({preventScroll:true});}
}
function announce(msg){const el=document.getElementById("live");if(el)el.textContent=msg;}

/* ---------- REF / UNIT UTILITIES ---------- */
let BOOKALIASES={};
const normBook=s=>String(s||"").toLowerCase().replace(/[^a-z0-9]/g,"");
function initBookAliases(){
  BOOKALIASES={};BIBLE.b.forEach((bk,i)=>{BOOKALIASES[normBook(bk.n)]=i;});
  const aliases={
    gen:"Genesis",ge:"Genesis",ex:"Exodus",exod:"Exodus",lev:"Leviticus",num:"Numbers",deut:"Deuteronomy",dt:"Deuteronomy",
    josh:"Joshua",judg:"Judges",jdg:"Judges",neh:"Nehemiah",esth:"Esther",ps:"Psalms",psa:"Psalms",psalm:"Psalms",
    prov:"Proverbs",pr:"Proverbs",eccl:"Ecclesiastes",ecc:"Ecclesiastes",song:"Song of Songs",sos:"Song of Songs",
    isa:"Isaiah",jer:"Jeremiah",lam:"Lamentations",ezek:"Ezekiel",ezk:"Ezekiel",dan:"Daniel",hos:"Hosea",obad:"Obadiah",
    jon:"Jonah",mic:"Micah",nah:"Nahum",hab:"Habakkuk",zeph:"Zephaniah",hag:"Haggai",zech:"Zechariah",mal:"Malachi",
    mt:"Matthew",matt:"Matthew",mk:"Mark",mrk:"Mark",lk:"Luke",jn:"John",joh:"John",ac:"Acts",rom:"Romans",
    "1sam":"1 Samuel","2sam":"2 Samuel","1kgs":"1 Kings","2kgs":"2 Kings","1ki":"1 Kings","2ki":"2 Kings",
    "1chr":"1 Chronicles","2chr":"2 Chronicles","1cor":"1 Corinthians","2cor":"2 Corinthians",gal:"Galatians",
    eph:"Ephesians",phil:"Philippians",col:"Colossians","1thess":"1 Thessalonians","2thess":"2 Thessalonians",
    "1tim":"1 Timothy","2tim":"2 Timothy",tit:"Titus",phlm:"Philemon",phm:"Philemon",heb:"Hebrews",jas:"James",
    jam:"James","1pet":"1 Peter","2pet":"2 Peter","1pt":"1 Peter","2pt":"2 Peter","1jn":"1 John","2jn":"2 John",
    "3jn":"3 John",rev:"Revelation"
  };
  Object.entries(aliases).forEach(([a,n])=>{const ix=BOOKALIASES[normBook(n)];if(ix!==undefined)BOOKALIASES[normBook(a)]=ix;});
  BOOKALIASES[normBook("Song of Solomon")]=BOOKALIASES[normBook("Song of Songs")];
}
function parseRef(s){
  const raw=String(s||"").trim().replace(/[–—]/g,"-");
  const m=raw.match(/^(.+?)\s+(\d+)(?:\s*:\s*(\d+)(?:\s*-\s*(?:(\d+)\s*:\s*)?(\d+))?)?$/);
  if(!m)return null;
  const bi=BOOKALIASES[normBook(m[1])];
  if(bi===undefined)return{error:"I couldn't recognize that Bible book. Try its full name or a common abbreviation such as Jn, Rom, or 1 Cor."};
  const ch=Number(m[2]),v1=m[3]===undefined?null:Number(m[3]),endCh=m[4]===undefined?ch:Number(m[4]),v2=m[5]===undefined?v1:Number(m[5]);
  const book=BIBLE.b[bi];
  if(ch<1||ch>book.c.length)return{error:book.n+" has "+book.c.length+" chapter"+(book.c.length===1?"":"s")+"."};
  if(v1===null)return{bi,ch,v1:null,endCh:ch,v2:null};
  if(v1<1)return{error:"Verse numbers begin at 1."};
  if(v1>book.c[ch-1].length)return{error:book.n+" "+ch+" has "+book.c[ch-1].length+" verses."};
  if(endCh<ch||endCh>book.c.length)return{error:"The ending chapter must exist and come after the starting chapter."};
  if(v2<1)return{error:"Verse numbers begin at 1."};
  if(v2>book.c[endCh-1].length)return{error:book.n+" "+endCh+" has "+book.c[endCh-1].length+" verses."};
  if(endCh===ch&&v2<v1)return{error:"The ending verse must come after the starting verse."};
  return{bi,ch,v1,endCh,v2};
}
function expandRef(s){
  const p=typeof s==="string"?parseRef(s):s;if(!p||p.error)return[];
  const book=BIBLE.b[p.bi];
  if(p.v1===null)return book.c[p.ch-1].map((_,vi)=>p.bi+":"+(p.ch-1)+":"+vi);
  const A={bi:p.bi,ci:p.ch-1,vi:p.v1-1},B={bi:p.bi,ci:p.endCh-1,vi:p.v2-1};
  return idsBetween(A,B);
}
function refUnit(s){const ids=expandRef(s);return ids.length?ukey(ids):null;}
function idParts(id){const[a,b,c]=id.split(":").map(Number);return{bi:a,ci:b,vi:c};}
function compareId(a,b){return a.bi-b.bi||a.ci-b.ci||a.vi-b.vi;}
function idsBetween(A,B){
  if(A.bi!==B.bi||compareId(A,B)>0)return[];
  const out=[];for(let ci=A.ci;ci<=B.ci;ci++){
    const first=ci===A.ci?A.vi:0,last=ci===B.ci?B.vi:BIBLE.b[A.bi].c[ci].length-1;
    for(let vi=first;vi<=last;vi++)out.push(A.bi+":"+ci+":"+vi);
  }return out;
}
function idText(id){const{bi,ci,vi}=idParts(id);return BIBLE.b[bi].c[ci][vi];}
function ukey(ids){return ids.length>1?ids[0]+"~"+ids[ids.length-1]:ids[0];}
function uids(key){
  if(!key.includes("~"))return[key];
  const[a,b]=key.split("~");const A=idParts(a),B=idParts(b);
  return idsBetween(A,B);
}
function uref(key){
  const ids=uids(key);const A=idParts(ids[0]);
  const base=BIBLE.b[A.bi].n+" "+(A.ci+1)+":"+(A.vi+1);
  if(ids.length===1)return base;
  const B=idParts(ids[ids.length-1]);
  return base+"–"+(A.ci===B.ci?(B.vi+1):((B.ci+1)+":"+(B.vi+1)));
}
function utext(key){return uids(key).map(idText).join(" ");}
function unitIdSet(k){return new Set(uids(k));}
function unitRelation(a,b){
  const A=unitIdSet(a),B=unitIdSet(b),overlap=[...A].some(id=>B.has(id));
  if(!overlap)return"none";
  if([...A].every(id=>B.has(id)))return A.size===B.size?"equal":"a-in-b";
  if([...B].every(id=>A.has(id)))return"b-in-a";
  return"partial";
}
function uhtml(key){
  const ids=uids(key);
  if(ids.length===1)return esc(idText(ids[0]));
  return ids.map(id=>`<sup>${idParts(id).vi+1}</sup>${esc(idText(id))}`).join(" ");
}
function usort(arr){return arr.sort((x,y)=>{
  const a=idParts(uids(x)[0]),b=idParts(uids(y)[0]);
  return a.bi-b.bi||a.ci-b.ci||a.vi-b.vi;});}
function activeSet(){return P.sets[P.active];}
function setUnits(){return usort([...new Set(activeSet().units)]).map(k=>({k,ref:uref(k),text:utext(k)}));}
function samplePool(n){
  const items=setUnits();
  const due=shuffle(items.filter(it=>isDue(it.k)));
  const rest=shuffle(items.filter(it=>!isDue(it.k)));
  return due.concat(rest).slice(0,n);
}
function profileUnitCount(profile=P){return(profile.sets||[]).reduce((total,item)=>total+(item.units||[]).length,0);}
function addUnitToSet(set,k){
  if(set.units.includes(k))return{status:"exists",removed:[]};
  const removed=[];
  for(const old of set.units){
    const rel=unitRelation(k,old);
    if(rel==="a-in-b")return{status:"covered",by:old,removed:[]};
    if(rel==="partial")return{status:"partial",by:old,removed:[]};
    if(rel==="b-in-a")removed.push(old);
  }
  if(set.units.length-removed.length+1>MAX_SET_UNITS)return{status:"set-limit",removed:[]};
  if(profileUnitCount()-removed.length+1>MAX_TOTAL_UNITS)return{status:"total-limit",removed:[]};
  if(removed.length)set.units=set.units.filter(old=>!removed.includes(old));
  set.units.push(k);
  if(removed.length){
    P.srs[k]=conservativeStateForUnit(k,[k,...removed]);
  }
  return{status:"added",removed};
}

/* ---------- UI HELPERS ---------- */
const shuffle=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
const esc=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
function toast(msg){const t=document.getElementById("toast");
  t.textContent=msg;t.classList.add("show");announce(msg);
  clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove("show"),1900);}
const reduceMotion=matchMedia("(prefers-reduced-motion: reduce)").matches;
function oilBurst(x,y,n){if(reduceMotion)return;
  for(let i=0;i<n;i++){
  const d=document.createElement("div");d.className="oil-drop";d.textContent="🪔";
  d.style.left=x+"px";d.style.top=y+"px";
  d.style.setProperty("--dx",(Math.random()*120-60)+"px");
  d.style.setProperty("--dy",(-120-Math.random()*80)+"px");
  document.body.appendChild(d);setTimeout(()=>d.remove(),850);}}
function award(n,ev){const before=P.oil;P.oil=Math.min(MAX_COUNTER,P.oil+n);const gained=P.oil-before;saveP();
  if(ev&&gained)oilBurst(ev.clientX||window.innerWidth/2,ev.clientY||200,Math.min(gained,4));return gained;}
function lvlDots(k,label){
  const L=lvl(k);
  return `<div class="lvl" role="img" aria-label="memory level ${L} of 5">${[0,1,2,3,4].map(i=>`<i class="${i<L?'lit':''}"></i>`).join("")}
   ${label?`<span class="lvl-label">${L>=MAXLVL?"burning bright":"level "+L}</span>`:""}</div>`;
}
function firstLetters(text){
  // First-letter method: every word contributes its true first letter with
  // original case preserved (capitals are memory cues), opening quotes and
  // trailing punctuation are kept so the hint mirrors the passage's shape,
  // and pure-punctuation tokens are kept so nothing silently disappears.
  const tokens=String(text||"").trim().split(/\s+/).filter(Boolean).map(word=>{
    const m=word.match(/[\p{L}\p{N}]/u);
    if(!m)return word;
    const lead=(word.match(/^[\u201C\u2018"'(\[]+/u)||[""])[0];
    const trail=(word.match(/[\u201D\u2019"')\].,;:?!]+$/u)||[""])[0];
    return lead+m[0]+trail;
  });
  return esc(tokens.join(" "));
}
function lampSVG(){
  const ks=allUnits();
  const m=ks.reduce((s,k)=>s+lvl(k),0),max=Math.max(1,ks.length*MAXLVL),pct=Math.min(1,m/max);
  const polish=Math.max(0,Math.min(5,P.lampLevel||0))/5,fh=18+pct*30,glowOp=Math.min(.95,.3+pct*.45+polish*.2);
  return `<svg class="lamp-svg" viewBox="0 0 160 150" aria-hidden="true">
    <ellipse class="glow" cx="80" cy="52" rx="${26+pct*22+polish*8}" ry="${20+pct*16+polish*6}" fill="#F2B34C" opacity="${glowOp}"/>
    ${polish?`<g class="lamp-rays" stroke="#E8CE8F" stroke-width="2" stroke-linecap="round" opacity="${.18+polish*.42}">
      <path d="M80 9v10M44 20l7 9M116 20l-7 9M27 49h11M133 49h-11"/></g>`:""}
    <g class="flame">
      <path d="M80 ${86-fh} C 68 ${86-fh*0.45} 70 82 80 88 C 90 82 92 ${86-fh*0.45} 80 ${86-fh} Z" fill="#F2B34C"/>
      <path d="M80 ${88-fh*0.55} C 75 ${88-fh*0.2} 76 84 80 87 C 84 84 85 ${88-fh*0.2} 80 ${88-fh*0.55} Z" fill="#FBE3A8"/>
    </g>
    <path d="M40 96 Q 40 88 50 88 L 96 88 Q 118 88 128 78 Q 126 94 108 99 L 106 100 Q 118 104 120 112 L 40 112 Q 34 104 40 96 Z"
      fill="none" stroke="#C9A24B" stroke-width="4" stroke-linejoin="round"/>
    <path d="M52 112 L 108 112 L 100 124 L 60 124 Z" fill="none" stroke="#C9A24B" stroke-width="4" stroke-linejoin="round"/>
    <line x1="46" y1="132" x2="114" y2="132" stroke="#C9A24B" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}
const LAMP_COSTS=[10,20,35,55,80];
function brightenLamp(){
  const level=Math.max(0,Math.min(5,P.lampLevel||0));if(level>=5){toast("Your lamp's finish is fully radiant");return;}
  const cost=LAMP_COSTS[level];if(P.oil<cost){toast("Earn "+(cost-P.oil)+" more oil to brighten the lamp");return;}
  P.oil-=cost;P.lampLevel=level+1;saveP();announce("Lamp glow level "+P.lampLevel+" of 5");homeRender();
}
function topbar(title,backAction="history.back()",backLabel="Go back"){
  return `<div class="topbar">
    <button class="back-btn" onclick="${backAction}" aria-label="${backLabel}">‹ Back</button>
    <h1 class="screen-title">${title}</h1>
    <span class="progress-pill" id="tb-pill"></span></div>`;
}
function practiceTopbar(title,mode){ACTIVE_PRACTICE_MODE=mode;return topbar(title,`requestPracticeExit('${mode}')`,`Leave ${title}`);}
function practiceInProgress(mode){
  if(mode==="flash")return !!(fc&&fc.deck&&(fc.i>0||fc.revealed));
  if(mode==="blanks")return !!(bl&&bl.deck&&(bl.i>0||(bl.cur&&!bl.cur.complete&&bl.cur.touched)));
  if(mode==="match")return !!(mt&&(mt.done>0||mt.miss>0||mt.selRef));
  if(mode==="builder")return !!(bd&&bd.deck&&(bd.i>0||(bd.cur&&!bd.cur.complete&&bd.cur.touched)));
  return false;
}
function requestPracticeExit(mode){
  if(!practiceInProgress(mode)){history.back();return;}
  document.getElementById("practice-leave-dialog")?.remove();
  const label={flash:"Flashcards",blanks:"Fill the Blanks",match:"Verse Match",builder:"Verse Builder"}[mode]||"practice";
  const host=document.createElement("div");host.id="practice-leave-dialog";host.className="dialog-scrim";
  host.innerHTML=`<div class="practice-dialog" role="alertdialog" aria-modal="true" aria-labelledby="leave-title" aria-describedby="leave-desc">
    <h2 id="leave-title">Leave ${label}?</h2>
    <p id="leave-desc">Your completed answers keep any oil already earned, but this round's summary will be abandoned.</p>
    <div class="dialog-actions"><button class="small-btn" id="stay-practice" onclick="dismissPracticeExit()">Keep practicing</button>
      <button class="small-btn danger" onclick="confirmPracticeExit()">Leave round</button></div></div>`;
  host.addEventListener("keydown",event=>{
    if(event.key==="Escape"){event.preventDefault();dismissPracticeExit();return;}
    if(event.key==="Tab"){
      const controls=[...host.querySelectorAll("button:not(:disabled)")];if(!controls.length)return;
      const first=controls[0],last=controls[controls.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  document.body.appendChild(host);document.getElementById("stay-practice").focus();
}
function dismissPracticeExit(){document.getElementById("practice-leave-dialog")?.remove();document.querySelector(".back-btn")?.focus();}
function confirmPracticeExit(){document.getElementById("practice-leave-dialog")?.remove();PRACTICE_EXIT_ARMED=true;history.back();}

/* ---------- HOME ---------- */
function homeRender(){
  const due=dueUnits().length;
  const s=activeSet();
  const streakTxt=P.streak.count>0
    ?`<span class="streak-fire" aria-hidden="true">🔥</span> ${P.streak.count}-day streak${P.streak.count===P.streak.best&&P.streak.best>1?" · personal best":""}`
    :"Tend the lamp today to start a streak";
  const storageWarn=(Store.mode==="memory"
    ?`<div class="warn-card" role="alert">⚠️ This browser is blocking persistent storage, so progress will be lost when you close the app. Use <b>Export</b> under All Sets to back up your progress.</div>`
    :(Store.notice?`<div class="warn-card" role="status">⚠️ ${esc(Store.notice)}</div>`:""))
    +(corruptProfileWarning?`<div class="warn-card recovery-warning" role="alert"><b>Saved-data recovery available.</b> ${esc(corruptProfileWarning)}
      <button class="small-btn" onclick="downloadCorruptRecovery()">Download recovery copy</button></div>`:"");
  const reviewCard=due>0
    ?`<div class="review-card"><h2>Today's Review</h2>
       <p><b>${due}</b> passage${due===1?" is":"s are"} due across your sets. A few honest minutes now moves each one up the flame.</p>
       <button class="review-go" onclick="nav(startReview)">Begin review · ${Math.min(due,20)} passage${Math.min(due,20)===1?"":"s"}</button></div>`
    :`<div class="review-card"><h2>All caught up ✓</h2>
       <p>Every passage is resting until its next scheduled review. Spacing the reviews out is what moves them into long-term memory.</p>
       <button class="review-go calm" onclick="nav(startFlash)">Play a practice round instead</button></div>`;
  const intro=!P.seenIntro?`
    <div class="onboard"><h3>How Lamplight works</h3><ol>
      <li><b>Gather passages</b> into a study set — search any phrase, browse topics, or walk the books in order. Multi-verse passages stay whole.</li>
      <li><b>Review daily.</b> Each passage climbs five flame levels across 1 → 2 → 4 → 7 → 14 → 30-day rests. Only unaided <i>Remembered</i> advances it; <i>Needed a hint</i> holds the level, and <i>Again</i> steps it down for a gentle retry tomorrow.</li>
      <li><b>Play games</b> to earn oil and get extra practice — games favor whatever is due. Only Daily Review, where you recite from memory, moves a passage up the ladder.</li></ol>
      <button class="pill-btn" onclick="P.seenIntro=true;saveP();homeRender()">Got it — light the lamp</button></div>`:"";
  show(`
  <div class="screen">
    <div class="lamp-wrap">${lampSVG()}
      <h1 class="app-title">Lamplight</h1>
      <div class="app-sub">Scripture Memory · Whole Bible</div>
      <div class="streak-line">${streakTxt}</div>
    </div>
    ${storageWarn}${intro}${reviewCard}
    <div class="stats">
      <div class="stat"><b>${P.oil}</b><span>Oil</span></div>
      <div class="stat"><b>${due}</b><span>Due</span></div>
      <div class="stat"><b>${learnedCount()}</b><span>Bright</span></div>
      <div class="stat"><b>${allUnits().length}</b><span>Passages</span></div>
    </div>
    <div class="oil-tend">
      <div><b>Lamp glow ${P.lampLevel||0}/5</b><span>Mastery grows the flame. Practice oil adds a permanent, cosmetic glow; Scripture is never locked.</span></div>
      ${(P.lampLevel||0)<5?`<button class="pill-ghost" onclick="brightenLamp()">Use ${LAMP_COSTS[P.lampLevel||0]} oil</button>`:`<span class="glow-max">Radiant ✓</span>`}
    </div>
    <div class="section-label"><span>Your set</span>
      <button class="mini-link" onclick="nav(setsScreen)">All sets →</button></div>
    <div class="set-card">
      <div class="grow"><div class="setname">${esc(s.name)}</div>
        <div class="setmeta">${s.units.length} passage${s.units.length===1?"":"s"} · ${s.units.filter(k=>lvl(k)>=MAXLVL).length} burning bright</div></div>
      <button class="pill-btn" onclick="nav(builderScreen)">+ Add</button>
    </div>
    <div class="section-label"><span>Practice games · earn oil</span></div>
    <div class="modes">
      <button class="mode-tile" onclick="nav(startFlash)"><span class="ico" aria-hidden="true">🃏</span><h3>Flashcards</h3><p>Recite, reveal, and self-grade.</p></button>
      <button class="mode-tile" onclick="nav(startBlanks)"><span class="ico" aria-hidden="true">✍️</span><h3>Fill the Blanks</h3><p>Restore rotating sections word by word.</p></button>
      <button class="mode-tile" onclick="nav(startMatch)"><span class="ico" aria-hidden="true">🔗</span><h3>Verse Match</h3><p>Pair verse references with unambiguous words.</p></button>
      <button class="mode-tile" onclick="nav(startVB)"><span class="ico" aria-hidden="true">🧱</span><h3>Verse Builder</h3><p>Rebuild rotating sections phrase by phrase.</p></button>
    </div>
    <div class="section-label"><span>In this set (canonical order)</span></div>
    <div>${setUnits().slice(0,8).map(it=>`
      <div class="vrow static"><div class="vmain">
        <div class="vref">${it.ref}${isDue(it.k)?'<span class="due-dot">DUE</span>':""}</div>
        <div class="vtxt">${esc(it.text.split(" ").slice(0,12).join(" "))}…</div>
        ${lvlDots(it.k,true)}</div></div>`).join("")
      ||"<p style='opacity:.6;font-size:.85rem;padding:4px'>This set is empty — add passages above.</p>"}
    ${s.units.length>8?`<button class="small-btn" onclick="nav(builderScreen)">Manage all ${s.units.length} →</button>`:""}
    <div class="footer-note">The Canon Series · Lamplight companion · v${APP_VERSION}<br>
      Scripture: ${TRANSLATION.name} (public domain) · ${BIBLE.t.toLocaleString()} verses onboard<br>
      Always free, for everyone — “Freely you received, so freely give.” (Matthew 10:8)<br>
      <button class="footer-link" onclick="nav(aboutScreen)">About · Privacy · Credits · Data</button></div>
  </div>`,".app-title");
}

/* ---------- DAILY REVIEW (the only place SRS levels move) ---------- */
let rv={};
function startReview(){
  const due=shuffle(dueUnits()).slice(0,20);
  if(!due.length){toast("Nothing due right now — well tended!");history.back();return;}
  rv={q:due,i:0,up:0,down:0,hints:0,lastGrade:null,hintUsed:false};
  renderReview();
}
function renderReview(){
  if(rv.i>=rv.q.length)return reviewResults();
  const k=rv.q[rv.i],ref=uref(k);rv.hintUsed=false;
  show(`
  <div class="screen">
    ${topbar("Daily Review")}
    ${rv.lastGrade?`<button class="undo-grade" onclick="undoReviewGrade()">↶ Undo last grade</button>`:""}
    <div class="recall-zone">
      <div class="paper recall-prompt">
        <div class="bigref">${ref}</div>
        <div style="display:flex;justify-content:center;margin-top:8px">${lvlDots(k,true)}</div>
        <div id="flbox" aria-live="polite"></div>
        <div class="recall-actions">
          <button class="fl-btn" id="hintbtn" onclick="showFL('${k}')">Show first letters</button>
          <button class="reveal-btn" id="review-reveal" aria-controls="review-answer" aria-expanded="false" onclick="revealReview()">Reveal passage</button>
        </div>
        <p class="recall-coach">Recite before revealing. A first-letter hint is useful practice, but only unaided recall moves the passage up.</p>
      </div>
      <div class="paper answer-panel" id="review-answer" hidden tabindex="-1" role="region" aria-label="Revealed passage"><div class="ref-line">${ref}</div>
        <div class="scripture">${uhtml(k)}</div></div>
    </div>
    <div class="grade-row three">
      <button class="grade-btn again" id="rv-again" disabled onclick="gradeRv('again')">Again<small>drops one level · tomorrow</small></button>
      <button class="grade-btn hinted" id="rv-hint" disabled onclick="gradeRv('hint')">Needed a hint<small>keeps level · tomorrow</small></button>
      <button class="grade-btn got" id="rv-remember" disabled onclick="gradeRv('remembered',event)">Remembered<small>unaided · level up</small></button>
    </div>
  </div>`);
  document.getElementById("tb-pill").textContent=(rv.i+1)+" / "+rv.q.length;
}
function showFL(k){
  document.getElementById("flbox").innerHTML=`<div class="firstletters">${firstLetters(utext(k))}</div>`;
  const b=document.getElementById("hintbtn");b.disabled=true;b.textContent="Hint shown";rv.hintUsed=true;
  const remembered=document.getElementById("rv-remember");if(remembered)remembered.disabled=true;
  announce("First-letter hint shown. Choose Needed a hint after checking the passage.");
}
function revealReview(){
  const answer=document.getElementById("review-answer"),button=document.getElementById("review-reveal");
  answer.hidden=false;button.disabled=true;button.setAttribute("aria-expanded","true");button.textContent="Passage revealed";
  document.getElementById("rv-again").disabled=false;document.getElementById("rv-hint").disabled=false;
  document.getElementById("rv-remember").disabled=!!rv.hintUsed;
  answer.focus();announce("Passage revealed. Grade your recall honestly.");
}
function gradeRv(outcome,ev){
  if(!["again","hint","remembered"].includes(outcome))return;
  if(document.getElementById("review-answer")&&document.getElementById("review-answer").hidden){toast("Reveal the passage before grading");return;}
  if(outcome==="remembered"&&rv.hintUsed){toast("Because a hint was shown, choose Needed a hint");return;}
  const k=rv.q[rv.i],had=Object.prototype.hasOwnProperty.call(P.srs,k);
  rv.lastGrade={k,index:rv.i,had,state:had?{...P.srs[k]}:null,oil:P.oil,up:rv.up,down:rv.down,hints:rv.hints};
  if(outcome==="remembered"){
    const r=gradeUp(k);rv.up++;award(2,ev);
    toast((r.level>=MAXLVL?"Burning bright! ":"Level "+r.level+" · ")+"next review in "+r.days+" day"+(r.days===1?"":"s"));
  }else if(outcome==="hint"){
    const r=gradeHint(k);rv.hints++;toast("Level "+r.level+" held · a fresh try tomorrow");
  }else{
    const r=gradeDown(k);rv.down++;toast("Back to level "+r.level+" · a fresh try tomorrow");
  }
  saveP();rv.i++;renderReview();
}
function undoReviewGrade(){
  const g=rv.lastGrade;if(!g)return;
  if(rv.finished){P.plays=rv.finishState.plays;P.streak={...rv.finishState.streak};rv.finished=false;}
  if(g.had)P.srs[g.k]=g.state;else delete P.srs[g.k];
  P.oil=g.oil;rv.up=g.up;rv.down=g.down;rv.hints=g.hints;rv.i=g.index;rv.lastGrade=null;saveP();renderReview();toast("Last review grade undone");
}
function reviewResults(){
  if(!rv.finished){rv.finishState={plays:P.plays,streak:{...P.streak}};markActive();P.plays=Math.min(MAX_COUNTER,P.plays+1);rv.finished=true;saveP();}
  show(`
  <div class="screen results">${lampSVG()}
    <h1 class="big screen-title">The lamp is tended.</h1>
    <p>${rv.up} passage${rv.up===1?"":"s"} climbed a level · ${rv.hints} held for a hint · ${rv.down} stepped down</p>
    <p style="margin-top:8px">🔥 ${P.streak.count}-day streak · Oil: <b style="color:var(--gold-light)">${P.oil}</b></p>
    ${rv.lastGrade?`<button class="ghost-btn" onclick="undoReviewGrade()">↶ Undo last grade</button>`:""}
    <button class="primary-btn" onclick="home()">Return to the lamp</button>
    ${dueUnits().length?`<button class="ghost-btn" onclick="startReview()">Review ${Math.min(dueUnits().length,20)} more due</button>`:""}
  </div>`);
}

/* ---------- SETS SCREEN (+ backup) ---------- */
function setsScreen(){
  const rows=P.sets.map((s,i)=>{
    const bright=s.units.filter(k=>lvl(k)>=MAXLVL).length;
    return `<div class="set-row ${i===P.active?'active':''}">
      <input type="radio" name="activeset" class="set-radio" id="sr${i}" ${i===P.active?"checked":""}
        onchange="P.active=${i};saveP();setsScreen()" aria-label="Make ${esc(s.name)} the active set">
      <label class="grow" for="sr${i}">
        <span class="sname">${esc(s.name)}</span>
        <span class="smeta">${s.units.length} passage${s.units.length===1?"":"s"} · ${bright} bright${i===P.active?" · active":""}</span></label>
      <button class="icon-btn" onclick="renameSet(${i})">Rename</button>
      <button class="icon-btn danger" id="del${i}" onclick="delSet(${i})">Delete</button>
    </div>`;}).join("");
  const modeLabel={capacitor:"native device storage",artifact:"preview storage",indexeddb:"browser database storage",local:"browser storage fallback",memory:"memory only — export a backup!"}[Store.mode]||Store.mode;
  show(`
  <div class="screen">
    ${topbar("Your Study Sets")}
    <p class="hint-text">The active set is what games practice and where new passages land. Daily Review always gathers due passages from <b>every</b> set, so nothing you're learning slips away.</p>
    <div class="newset-row">
      <input class="search-input" id="newsetname" placeholder="New set name — e.g. Spring Group" maxlength="40" aria-label="New set name">
      <button class="go-btn" onclick="newSet()">Create</button>
    </div>
    ${rows}
    <div class="section-label"><span>Backup</span></div>
    <p class="hint-text">Progress is saved to ${modeLabel}. Export a backup any time — it's a small text file you can keep or move to another device.</p>
    <div class="row-actions">
      <button class="small-btn" onclick="exportP()">⬇ Export progress</button>
      <button class="small-btn" onclick="importUI()">⬆ Import backup</button>
      <button class="small-btn" onclick="nav(aboutScreen)">Privacy & data</button>
    </div>
    <div id="backupbox"></div>
  </div>`);
  document.getElementById("tb-pill").textContent=P.sets.length+" set"+(P.sets.length===1?"":"s");
}
function newSet(){
  const el=document.getElementById("newsetname");
  const name=el.value.trim();
  if(!name){toast("Give the set a name first");el.focus();return;}
  if(P.sets.length>=MAX_SETS){toast("Lamplight supports up to "+MAX_SETS+" study sets. Delete an unused set before creating another.");return;}
  P.sets.push({name,units:[]});P.active=P.sets.length-1;saveP();
  toast("“"+name+"” created and active");setsScreen();
}
function renameSet(i){
  const row=document.querySelectorAll(".set-row")[i];
  if(!row||!P.sets[i])return;
  row.innerHTML=`<label class="sr-only" for="ren${i}">New name for ${esc(P.sets[i].name)}</label>
    <input class="search-input set-rename-input" id="ren${i}" value="${esc(P.sets[i].name)}" maxlength="40"
      onkeydown="renameSetKey(event,${i})" aria-describedby="rename-help${i}">
    <span class="sr-only" id="rename-help${i}">Press Enter to save or Escape to cancel.</span>
    <div class="set-edit-actions"><button class="go-btn" onclick="saveRename(${i})">Save</button>
      <button class="small-btn" onclick="cancelSetEdit()">Cancel</button></div>`;
  const input=document.getElementById("ren"+i);input.focus();input.select();
}
function renameSetKey(event,i){
  if(event.key==="Enter"){event.preventDefault();saveRename(i);}
  else if(event.key==="Escape"){event.preventDefault();cancelSetEdit();}
}
function saveRename(i){
  const input=document.getElementById("ren"+i);if(!input||!P.sets[i])return;
  const name=input.value.trim();if(!name){toast("A set name cannot be empty");input.focus();return;}
  const old=P.sets[i].name;P.sets[i].name=name;saveP();setsScreen();announce(old===name?"Set name unchanged":"Set renamed to "+name);
}
function cancelSetEdit(){setsScreen();announce("Rename cancelled");}
function delSet(i){
  const row=document.querySelectorAll(".set-row")[i],set=P.sets[i];if(!row||!set)return;
  const count=set.units.length;
  row.innerHTML=`<div class="set-delete-confirm" role="group" aria-labelledby="delete-set-title${i}" aria-describedby="delete-set-desc${i}"
      onkeydown="if(event.key==='Escape'){event.preventDefault();cancelSetDelete()}">
    <b id="delete-set-title${i}">Delete “${esc(set.name)}”?</b>
    <span id="delete-set-desc${i}">This set contains ${count} passage${count===1?"":"s"}. Mastery shared with another set stays available there.</span>
    <div class="set-edit-actions"><button class="small-btn" id="cancel-delete${i}" onclick="cancelSetDelete()">Cancel</button>
      <button class="small-btn danger" onclick="confirmDeleteSet(${i})">Confirm delete</button></div></div>`;
  document.getElementById("cancel-delete"+i).focus();announce("Confirm deletion of "+set.name+", containing "+count+" passages");
}
function cancelSetDelete(){setsScreen();announce("Set deletion cancelled");}
function confirmDeleteSet(i){
  if(!P.sets[i])return;const deleted=P.sets[i].name,wasActive=P.active;P.sets.splice(i,1);
  if(i<wasActive)P.active=wasActive-1;
  else if(i===wasActive)P.active=Math.min(i,Math.max(0,P.sets.length-1));
  else P.active=wasActive;
  if(!P.sets.length){P.sets=[{name:"My Study Set",units:[]}];P.active=0;}
  saveP();setsScreen();toast("“"+deleted+"” deleted");
}
function backupEnvelope(profile=P){compactProfileRecords(profile);return{format:"lamplight-backup",version:1,appVersion:APP_VERSION,exportedAt:new Date().toISOString(),profile:JSON.parse(JSON.stringify(profile))};}
function backupString(profile=P){return JSON.stringify(backupEnvelope(profile));}
function exportP(){
  const data=backupString();
  const box=document.getElementById("backupbox");
  box.innerHTML=`<div class="paper" style="padding:14px">
    <p style="font-size:.75rem;color:#7A6329;margin-bottom:8px">Your backup — copy it somewhere safe, or download:</p>
    <textarea class="backup-ta" id="bkta" readonly aria-label="Backup data">${esc(data)}</textarea>
    <div class="row-actions" style="margin-top:10px;margin-bottom:0">
      <button class="small-btn" onclick="copyBk()">Copy</button>
      <button class="small-btn" onclick="dlBk()">Download file</button>
    </div></div>`;
  window.__bk=data;
}
async function copyBk(){
  const ta=document.getElementById("bkta");ta.select();
  try{if(navigator.clipboard)await navigator.clipboard.writeText(window.__bk);else if(!document.execCommand("copy"))throw new Error("copy failed");
    toast("Backup copied to clipboard");}catch(e){toast("Select the text and copy manually");}
}
function downloadBackupFile(data=window.__bk,label="backup"){
  try{
    const blob=new Blob([data],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download="lamplight-"+label+"-"+todayStr()+".json";
    document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);return true;
  }catch(e){toast("Download blocked here — use Copy instead");}
}
function dlBk(){downloadBackupFile(window.__bk,"backup");}
function importUI(){
  const box=document.getElementById("backupbox");
  box.innerHTML=`<div class="paper" style="padding:14px">
    <p style="font-size:.75rem;color:#7A6329;margin-bottom:8px">Paste a Lamplight backup below. Lamplight validates it first and asks again before replacing current progress.</p>
    <textarea class="backup-ta" id="impta" aria-label="Paste backup data"></textarea>
    <div class="row-actions" style="margin-top:10px;margin-bottom:0">
      <button class="small-btn" onclick="doImport()">Validate backup</button>
    </div></div>`;
  document.getElementById("impta").focus();
}
let pendingImport=null;
function readBackup(text){
  if(typeof text!=="string"||text.length>MAX_BACKUP_CHARS)throw new Error("That backup is too large to validate safely.");
  const o=JSON.parse(text);
  if(o&&o.format==="lamplight-backup"){
    if(o.version!==1||typeof o.appVersion!=="string"||!Number.isFinite(Date.parse(o.exportedAt||""))||!isObj(o.profile))throw new Error("The backup envelope is incomplete.");
    if(Number(o.profile.v)!==PROFILE_VERSION)throw new Error("This versioned backup uses an unsupported profile schema.");
    return normalizeProfile(o.profile,{sourceVersion:PROFILE_VERSION,strict:true});
  }
  if(o&&[3,4].includes(Number(o.v)))return normalizeProfile(o,{sourceVersion:Number(o.v)});
  throw new Error("This is not a supported, versioned Lamplight backup.");
}
function doImport(){
  try{
    pendingImport=readBackup(document.getElementById("impta").value.trim());
    const box=document.getElementById("backupbox");
    box.innerHTML=`<div class="paper confirm-card" role="alert"><p><b>Backup validated.</b></p>
      <p>${pendingImport.sets.length} set${pendingImport.sets.length===1?"":"s"} · ${Object.keys(pendingImport.srs).length} memory record${Object.keys(pendingImport.srs).length===1?"":"s"}. Restoring will replace the progress currently on this device. A pre-import recovery file will download first.</p>
      <div class="row-actions"><button class="small-btn danger" onclick="confirmImport()">Confirm restore</button><button class="small-btn" onclick="setsScreen()">Cancel</button></div></div>`;
    box.querySelector("button").focus();
  }catch(e){pendingImport=null;toast(e.message||"That doesn't look like a Lamplight backup");}
}
async function confirmImport(){
  if(!pendingImport)return;
  const recovery=backupString(P);downloadBackupFile(recovery,"before-import");
  await Store.set("lamplight-pre-import",recovery);
  P=pendingImport;pendingImport=null;await saveP({immediate:true});toast("Backup restored safely");setsScreen();
}

/* ---------- ABOUT / PRIVACY / CREDITS / DATA ---------- */
function aboutScreen(){
  const modeLabel={capacitor:"native device storage",artifact:"preview storage",indexeddb:"IndexedDB",local:"localStorage fallback",memory:"temporary memory"}[Store.mode]||Store.mode;
  show(`<div class="screen legal-screen">
    ${topbar("About & Your Data")}
    <div class="paper legal-paper">
      <h2>Lamplight ${APP_VERSION}</h2>
      <p>Lamplight is a free, offline-first Scripture-memory game. Daily Review uses retrieval practice and calendar-day spacing. Only an unaided <b>Remembered</b> grade advances mastery; a first-letter hint holds the level, and games award only cosmetic oil.</p>
      <h2>Privacy</h2>
      <p>No account, advertising, analytics, telemetry, or third-party content request is built into the app. Study sets, progress, streaks, and cosmetic choices remain in ${modeLabel} on this device unless you export them.</p>
      <p>When installed from or opened as a hosted PWA, the app checks its own hosting origin for files and updates. That host may receive ordinary request information such as an IP address and browser details. Lamplight does not send your study progress with those requests.</p>
      <p>For support or privacy questions, copy this address: <span class="selectable-contact">Canon.Series.Packets@gmail.com</span></p>
      <h2>Credits</h2>
      <p>Scripture is the public-domain <b>World English Bible (WEB)</b>, carried onboard for offline study. Fraunces and Barlow are used under the SIL Open Font License. The pine, gold, cream, lamp artwork, and learning interface are part of Lamplight.</p>
      <h2>Your controls</h2>
      <p>Export regularly if this material matters to you. Backups contain study progress and set names in readable JSON; store them somewhere you trust.</p>
      <div class="row-actions"><button class="small-btn" onclick="exportP()">Export backup</button><button class="small-btn" onclick="importUI()">Import backup</button><button class="small-btn danger" onclick="resetUI()">Reset all study data</button></div>
      <div id="backupbox"></div>
    </div>
  </div>`);
}
function resetUI(){
  document.getElementById("backupbox").innerHTML=`<div class="paper confirm-card" role="alert"><p><b>Reset all study data?</b></p>
    <p>This removes sets, mastery, streaks, oil, practice history${corruptProfileRecovery?", and the preserved corrupt-data recovery copy":""} from this device, then restores the eleven starter passages. ${corruptProfileRecovery?"Both available recovery files":"A recovery file"} download${corruptProfileRecovery?"":"s"} immediately before the reset.</p>
    <label for="resetword">Type <b>RESET</b> to continue</label><input class="search-input reset-input" id="resetword" autocomplete="off">
    <div class="row-actions"><button class="small-btn danger" onclick="resetAllData()">Permanently reset</button><button class="small-btn" onclick="aboutScreen()">Cancel</button></div></div>`;
  document.getElementById("resetword").focus();
}
async function resetAllData(){
  const input=document.getElementById("resetword");if(!input||input.value.trim()!=="RESET"){toast("Type RESET exactly to confirm");input?.focus();return;}
  downloadBackupFile(backupString(P),"before-reset");
  if(corruptProfileRecovery)downloadBackupFile(corruptProfileRecovery,"corrupt-profile-recovery");
  const keys=[STORAGE_KEY,"lamplight4","lamplight3","lamplight2-progress","lamplight-pre-import",CORRUPT_RECOVERY_KEY];
  for(const k of keys)await Store.remove(k);
  try{keys.forEach(k=>localStorage.removeItem(k));}catch(e){}
  try{const db=Store.db||await Store.openDB();Store.db=db;for(const k of keys)await Store.idbRemove(k);}catch(e){}
  try{if(window.storage)for(const k of keys){if(window.storage.delete)await window.storage.delete(k);else if(window.storage.set)await window.storage.set(k,"");}}catch(e){}
  try{const prefs=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Preferences;if(prefs)for(const k of keys)await prefs.remove({key:k});}catch(e){}
  corruptProfileRecovery=null;corruptProfileWarning="";
  P=freshProfile(true);P.sets=[{name:"Canon Starter",units:ALLTOPICS[0].r.map(refUnit).filter(Boolean)}];P.active=0;
  await saveP({immediate:true});toast("Study data reset");home();
}

/* ---------- SET BUILDER ---------- */
let TAB="topics",NAV_STATES={search:{},topics:{},books:{}},NAV=NAV_STATES.topics;
function builderScreen(){NAV=NAV_STATES[TAB];renderBuilder();}
function switchTab(t){
  if(!NAV_STATES[t]||t===TAB)return;
  NAV_STATES[TAB]=NAV;TAB=t;NAV=NAV_STATES[t];renderBuilder();
}
function tabKey(event){
  const order=["search","topics","books"],i=order.indexOf(TAB);let next=null;
  if(event.key==="ArrowRight")next=order[(i+1)%order.length];
  if(event.key==="ArrowLeft")next=order[(i+order.length-1)%order.length];
  if(next){event.preventDefault();switchTab(next);document.getElementById("tab-"+next)?.focus();}
}
function coverageState(k){
  if(activeSet().units.includes(k))return{selected:true,exact:true};
  const by=activeSet().units.find(old=>unitRelation(k,old)==="a-in-b");return{selected:!!by,exact:false,by};
}
function inSet(k){return coverageState(k).selected;}
function renderBuilder(){
  show(`
  <div class="screen">
    ${topbar("Add Passages")}
    <div class="adding-note">Adding to <b>${esc(activeSet().name)}</b> · <button onclick="nav(setsScreen)">switch set</button></div>
    <div class="tabs" role="tablist" aria-label="Ways to add Scripture" onkeydown="tabKey(event)">
      <button class="tab ${TAB==='search'?'on':''}" id="tab-search" role="tab" aria-selected="${TAB==='search'}" aria-controls="tabbody" tabindex="${TAB==='search'?0:-1}" onclick="switchTab('search')">🔍 Phrase Search</button>
      <button class="tab ${TAB==='topics'?'on':''}" id="tab-topics" role="tab" aria-selected="${TAB==='topics'}" aria-controls="tabbody" tabindex="${TAB==='topics'?0:-1}" onclick="switchTab('topics')">🏷️ Topics</button>
      <button class="tab ${TAB==='books'?'on':''}" id="tab-books" role="tab" aria-selected="${TAB==='books'}" aria-controls="tabbody" tabindex="${TAB==='books'?0:-1}" onclick="switchTab('books')">📖 Canonical</button>
    </div>
    <div id="tabbody" role="tabpanel" aria-labelledby="tab-${TAB}">${tabBody()}</div>
  </div>
  <div class="setbar"><div class="setbar-inner">
    <span id="setbar-count"></span>
    <button class="setbar-done" onclick="home()">Done</button>
  </div></div>`);
  refreshCounts();
  if(TAB==="search"){
    const el=document.getElementById("q");
    if(el&&NAV.q){el.value=NAV.q;runSearch();}
  }
}
function tabBody(){
  if(TAB==="search")return searchBody();
  if(TAB==="topics")return NAV.topic!==undefined?topicView(NAV.topic):topicsBody();
  if(NAV.bi!==undefined&&NAV.ci!==undefined)return verseListBody(NAV.bi,NAV.ci);
  if(NAV.bi!==undefined)return chapterBody(NAV.bi);
  return booksBody();
}
function uRow(k,showText){
  const state=coverageState(k),sel=state.selected;
  const n=uids(k).length;
  return `<button class="vrow ${sel?'sel':''}" aria-pressed="${sel}" onclick="togglePick('${k}',this)">
    <span class="vcheck" aria-hidden="true">${sel?"✓":""}</span>
    <span class="vmain"><span class="vref">${uref(k)}${n>1?` <span class="pass-tag">passage · ${n} vv</span>`:""}</span>
    ${showText?`<span class="vtxt">${esc(utext(k).split(" ").slice(0,26).join(" "))}${utext(k).split(" ").length>26?"…":""}</span>`:""}
    ${lvlDots(k,false)}</span>
  </button>`;
}
function togglePick(k,el){
  const u=activeSet().units;
  const ix=u.indexOf(k);
  if(ix>-1){u.splice(ix,1);el.classList.remove("sel");el.setAttribute("aria-pressed","false");
    el.querySelector(".vcheck").textContent="";announce(uref(k)+" removed from set");}
  else{
    const r=addUnitToSet(activeSet(),k);
    if(r.status==="covered"){toast(uref(k)+" is already included in "+uref(r.by));return;}
    if(r.status==="partial"){toast("That overlaps "+uref(r.by)+". Remove it first so review units stay unambiguous.");return;}
    if(r.status==="set-limit"){toast("This set has reached its "+MAX_SET_UNITS.toLocaleString()+"-passage limit. Start another set to keep adding.");return;}
    if(r.status==="total-limit"){toast("Your profile has reached its "+MAX_TOTAL_UNITS.toLocaleString()+"-passage limit. Remove an unused passage before adding another.");return;}
    el.classList.add("sel");el.setAttribute("aria-pressed","true");el.querySelector(".vcheck").textContent="✓";
    announce(uref(k)+" added to set"+(r.removed.length?" and replaced "+r.removed.length+" contained item":""));
  }
  saveP();refreshCounts();
}
function refreshCounts(){
  const n=activeSet().units.length;
  const pill=document.getElementById("tb-pill");
  if(pill)pill.textContent=n+" in set";
  const bar=document.getElementById("setbar-count");
  if(bar)bar.textContent=n+" passage"+(n===1?"":"s")+" · "+activeSet().name;
}
function addAll(keys){
  let added=0,skipped=0,replaced=0,setLimited=0,totalLimited=0;
  keys.forEach(k=>{const r=addUnitToSet(activeSet(),k);if(r.status==="added"){added++;replaced+=r.removed.length;}
    else if(r.status==="set-limit")setLimited++;else if(r.status==="total-limit")totalLimited++;else skipped++;});
  saveP();renderBuilder();toast(added+" added"+(replaced?" · "+replaced+" contained item"+(replaced===1?"":"s")+" replaced":"")
    +(skipped?" · "+skipped+" already covered/overlapping":"")+(setLimited?" · set limit reached":"")+(totalLimited?" · profile limit reached":""));
}

/* search tab */
function searchBody(){
  return `
  <div class="search-row">
    <input class="search-input" id="q" placeholder='Try "still small voice" or John 3:16' aria-label="Search all verses"
      oninput="NAV.q=this.value;if(!this.value.trim()){NAV.res='';document.getElementById('sres').innerHTML=''}" onkeydown="if(event.key==='Enter')runSearch()">
    <button class="go-btn" onclick="runSearch()">Go</button>
  </div>
  <p class="hint-text">Phrase search checks all ${BIBLE.t.toLocaleString()} verses and ignores letter case, punctuation style, and extra whitespace. References accept full names or common abbreviations, hyphens/en dashes, whole chapters, and cross-chapter ranges (for example Jn 3:16, Romans 8:28–39, Psalms 23, or Matthew 5:43–6:4).</p>
  <div id="sres" aria-live="polite">${NAV.res||""}</div>`;
}
function normalizePhraseSearch(text){
  return String(text||"").normalize("NFKD").replace(/\p{M}/gu,"").toLocaleLowerCase()
    .replace(/[\p{P}\p{S}]+/gu," ").replace(/\s+/g," ").trim();
}
function runSearch(){
  const q=document.getElementById("q").value.trim();
  NAV.q=q;if(!q){NAV.res=`<div class="empty-state">Enter a phrase or Scripture reference to search.</div>`;document.getElementById("sres").innerHTML=NAV.res;return;}
  let html="",recognizedRef=false;
  const parsed=parseRef(q);
  if(parsed){
    recognizedRef=true;
    if(parsed.error)html=`<div class="empty-state" role="alert">${esc(parsed.error)}</div>`;
    const ids=expandRef(parsed);
    if(ids.length){
      if(ids.length>500){
        html=`<div class="empty-state" role="alert">That range contains ${ids.length} verses. For focused practice and reliable backups, add it as smaller passages of 500 verses or fewer.</div>`;
        NAV.res=html;document.getElementById("sres").innerHTML=html;return;
      }
      const pk=ukey(ids);
      html=`<p class="hint-text">${ids.length} verse${ids.length===1?"":"s"} in ${esc(uref(pk))}</p>`;
      if(ids.length>1){
        html+=`<div class="row-actions">
          <button class="small-btn" onclick='addAll(["${pk}"])'>➕ Add as one passage</button>
          <button class="small-btn" onclick='addAll(${JSON.stringify(ids)})'>Add each verse separately</button></div>`;
        html+=uRow(pk,true)+`<p class="hint-text">…or pick individual verses:</p>`;
      }
      html+=ids.map(id=>uRow(id,true)).join("");
    }
  }
  if(!html&&!recognizedRef){
    if(!FLAT){FLAT=[];BIBLE.b.forEach((bk,bi)=>bk.c.forEach((ch,ci)=>ch.forEach((t,vi)=>FLAT.push([bi+":"+ci+":"+vi,normalizePhraseSearch(t)]))));}
    const needle=normalizePhraseSearch(q),hits=[];
    if(!needle){html=`<div class="empty-state">Add at least one letter or number to search by phrase.</div>`;NAV.res=html;document.getElementById("sres").innerHTML=html;return;}
    for(const[id,t]of FLAT){if(t.includes(needle)){hits.push(id);if(hits.length>=200)break;}}
    if(!hits.length)html=`<p class="hint-text">No phrase match for “${esc(q)}”. Try fewer words, or check the phrasing against the ${TRANSLATION.name}.</p>`;
    else html=`<p class="hint-text">${hits.length>=200?"First 200 matches":hits.length+" match"+(hits.length===1?"":"es")} for “${esc(q)}”
      &nbsp;<button class="small-btn" onclick='addAll(${JSON.stringify(hits)})'>Add all</button></p>`
      +hits.map(id=>uRow(id,true)).join("");
  }
  NAV.res=html;
  document.getElementById("sres").innerHTML=html;
}

/* topics tab */
function topicsInner(){
  const f=(NAV.filter||"").toLowerCase();
  const html=TGROUPS.map(g=>{
    const chips=g.t.filter(t=>!f||t.n.toLowerCase().includes(f))
      .map(t=>`<button class="topic-chip" onclick="NAV.topic=${t._ix};renderBuilder()">${t.i} ${esc(t.n)}</button>`).join("");
    return chips?`<h2 class="tgroup">${g.g}</h2><div class="chip-grid">${chips}</div>`:"";
  }).join("");
  return html||`<div class="empty-state">No topics match “${esc(NAV.filter||"")}”. Try a broader word.</div>`;
}
function topicsBody(){
  return `<div class="search-row">
    <input class="search-input" id="tfilter" placeholder="Filter ${ALLTOPICS.length} topics…" value="${esc(NAV.filter||"")}" aria-label="Filter topics"
      oninput="NAV.filter=this.value;document.getElementById('tgroups').innerHTML=topicsInner()">
  </div><div id="tgroups">${topicsInner()}</div>`;
}
function topicView(ix){
  const t=ALLTOPICS[ix];if(!t)return topicsBody();
  const keys=t.r.map(refUnit).filter(Boolean);
  return `<div class="row-actions">
    <button class="small-btn" onclick="delete NAV.topic;renderBuilder()">‹ All topics</button>
    <button class="small-btn" onclick='addAll(${JSON.stringify(keys)})'>Add all ${keys.length}</button>
  </div>
  <p class="hint-text">${t.i} <b>${esc(t.n)}</b> — ${esc(t.d)}</p>
  ${keys.map(k=>uRow(k,true)).join("")}`;
}

/* canonical tab */
function booksBody(){
  const btn=(bk,bi)=>`<button class="book-btn" onclick="NAV.bi=${bi};renderBuilder()">${bk.n}
    <small>${bk.c.length} chapter${bk.c.length===1?"":"s"}</small></button>`;
  return `<h2 class="tgroup" style="margin-top:2px">Old Testament</h2>
  <div class="book-grid">${BIBLE.b.slice(0,OT_COUNT).map((b,i)=>btn(b,i)).join("")}</div>
  <h2 class="tgroup">New Testament</h2>
  <div class="book-grid">${BIBLE.b.slice(OT_COUNT).map((b,i)=>btn(b,i+OT_COUNT)).join("")}</div>`;
}
function chapterBody(bi){
  const bk=BIBLE.b[bi];
  return `<div class="row-actions"><button class="small-btn" onclick="delete NAV.bi;delete NAV.ci;renderBuilder()">‹ All books</button></div>
  <p class="hint-text"><b>${bk.n}</b> — choose a chapter</p>
  <div class="ch-grid">${bk.c.map((c,ci)=>
    `<button class="ch-btn" onclick="NAV.ci=${ci};renderBuilder()" aria-label="${bk.n} chapter ${ci+1}">${ci+1}</button>`).join("")}</div>`;
}
function verseListBody(bi,ci){
  const bk=BIBLE.b[bi];
  const ids=bk.c[ci].map((_,vi)=>bi+":"+ci+":"+vi);
  const chKey=ukey(ids);
  return `<div class="row-actions">
    <button class="small-btn" onclick="delete NAV.ci;renderBuilder()">‹ ${bk.n}</button>
    <button class="small-btn" onclick='addAll(["${chKey}"])'>➕ Whole chapter as one passage</button>
    <button class="small-btn" onclick='addAll(${JSON.stringify(ids)})'>Each verse separately</button>
  </div>
  <p class="hint-text"><b>${bk.n} ${ci+1}</b> — ${ids.length} verses. Tip: for memorizing a flowing section, add it as a passage from the Phrase Search tab (e.g. “${bk.n} ${ci+1}:1-8”).</p>
  ${ids.map(id=>uRow(id,true)).join("")}`;
}

/* ---------- GAMES (oil only — never move SRS levels) ---------- */
function gameCredit(k,oilAmt,ev){const gained=award(oilAmt,ev);toast(gained?"+"+gained+" oil · "+uref(k):"Oil reserve full · "+uref(k));return gained;}
function needSet(n,label){
  if(activeSet().units.length>=n)return true;
  toast(label+" needs at least "+n+" passage"+(n===1?"":"s")+" in “"+activeSet().name+"”");
  history.back();return false;
}
function endRound(){P.plays=Math.min(MAX_COUNTER,P.plays+1);saveP();}
const WORDCAP_BLANKS=42, WORDCAP_BUILD=18;
function practiceChunk(text,k,n,mode){
  const all=String(text).trim().split(/\s+/),store=P.practice[mode],raw=Math.max(0,Number(store[k])||0),start=raw>=all.length?0:raw;
  let end=Math.min(all.length,start+n);
  if(end<all.length){
    const floor=start+Math.ceil(n*.65);for(let i=end-1;i>=floor;i--){if(/[.!?][”’"']?$/.test(all[i])){end=i+1;break;}}
  }
  return{words:all.slice(start,end),start,end,total:all.length,next:end>=all.length?0:end,truncated:start>0||end<all.length,
    label:all.length<=n?"complete passage":"words "+(start+1)+"–"+end+" of "+all.length};
}
function commitPracticeChunk(k,mode,chunk){P.practice[mode][k]=chunk.next;saveP();}
function practiceFeedback(text){
  const el=document.getElementById("practice-feedback");if(el)el.textContent=text;announce(text);
}
function currentRecoveryRound(mode){return mode==="blanks"?bl&&bl.cur:mode==="builder"?bd&&bd.cur:null;}
function askPracticeSkip(mode){
  const c=currentRecoveryRound(mode),box=document.getElementById("practice-feedback");if(!c||c.complete||!box)return;
  c.touched=true;
  document.querySelectorAll(".practice-recovery button").forEach(button=>button.disabled=true);
  box.innerHTML=`<span id="skip-question">Show the full answer and skip this section? It earns no oil and will return next time.</span>
    <span class="skip-actions"><button class="small-btn" id="keep-practicing" onclick="cancelPracticeSkip('${mode}')">Keep trying</button>
      <button class="small-btn danger" onclick="confirmPracticeSkip('${mode}')">Confirm: show answer & skip</button></span>`;
  box.setAttribute("role","group");box.setAttribute("aria-labelledby","skip-question");document.getElementById("keep-practicing").focus();
}
function cancelPracticeSkip(mode){
  const box=document.getElementById("practice-feedback");if(box){box.setAttribute("role","status");box.removeAttribute("aria-labelledby");}
  document.querySelectorAll(".practice-recovery button").forEach(button=>button.disabled=false);
  practiceFeedback("Keep trying. Help remains available whenever you need it.");
  document.getElementById(mode==="blanks"?"blank-hint":"builder-hint")?.focus();
}
function confirmPracticeSkip(mode){
  const c=currentRecoveryRound(mode);if(!c||c.complete)return;
  c.complete=true;c.skipped=true;c.touched=true;c.hadWrong=true;
  document.querySelectorAll(".bank .chip,.practice-recovery button").forEach(button=>button.disabled=true);
  if(!c.skipCounted){c.skipCounted=true;if(mode==="blanks")bl.wrong++;else bd.wrong++;}
  if(mode==="blanks"){
    const text=document.getElementById("blank-text");if(text)text.innerHTML=esc(c.words.join(" "))+(c.chunk.truncated?" …":"");
  }else{
    const built=document.getElementById("built");if(built){built.innerHTML="";c.order.forEach(phrase=>{const span=document.createElement("span");span.className="chip";span.textContent=phrase;built.appendChild(span);});}
  }
  const box=document.getElementById("practice-feedback");if(box){box.setAttribute("role","status");box.removeAttribute("aria-labelledby");
    box.innerHTML=`Answer shown. This section earned no oil and will return next time.
      <span class="skip-actions"><button class="small-btn" onclick="continueSkippedPractice('${mode}')">Continue</button></span>`;
    box.querySelector("button").focus();}
  announce("Answer shown. No oil was awarded. Continue when ready.");
}
function continueSkippedPractice(mode){
  const c=currentRecoveryRound(mode);if(!c||!c.skipped)return;
  if(mode==="blanks"){bl.i++;renderBlanks();}else{bd.i++;renderVB();}
}

/* Flashcards */
let fc={};
function startFlash(){
  if(!needSet(1,"Flashcards"))return;
  fc={deck:samplePool(10),i:0,clean:0,missed:0,n:0,retries:{},revealed:false};fc.n=fc.deck.length;
  renderFlash();
}
function renderFlash(){
  if(fc.i>=fc.deck.length)return results("Flashcards",fc.clean,fc.n,startFlash,fc.missed);
  const v=fc.deck[fc.i];fc.revealed=false;
  show(`
  <div class="screen">
    ${practiceTopbar("Flashcards","flash")}
    <div class="recall-zone">
      <div class="paper recall-prompt"><div class="bigref">${v.ref}</div>
        <div style="display:flex;justify-content:center;margin-top:8px">${lvlDots(v.k,true)}</div>
        <button class="reveal-btn" id="flash-reveal" aria-controls="flash-answer" aria-expanded="false" onclick="revealFlash()">Reveal passage</button>
        <p class="recall-coach">Say as much as you can before revealing, then grade the attempt honestly.</p>
      </div>
      <div class="paper answer-panel" id="flash-answer" hidden tabindex="-1" role="region" aria-label="Revealed passage"><div class="ref-line">${v.ref}</div>
        <div class="scripture">${uhtml(v.k)}</div></div>
    </div>
    <div class="grade-row">
      <button class="grade-btn again" id="fc-again" disabled onclick="gradeFlash(false)">Again<small>one gentle retry at most</small></button>
      <button class="grade-btn got" id="fc-got" disabled onclick="gradeFlash(true,event)">Remembered +3 oil<small>practice only · mastery unchanged</small></button>
    </div>
  </div>`);
  document.getElementById("tb-pill").textContent=(fc.i+1)+" / "+fc.deck.length;
}
function revealFlash(){
  const answer=document.getElementById("flash-answer"),button=document.getElementById("flash-reveal");
  answer.hidden=false;button.disabled=true;button.setAttribute("aria-expanded","true");button.textContent="Passage revealed";fc.revealed=true;
  document.getElementById("fc-again").disabled=false;document.getElementById("fc-got").disabled=false;answer.focus();announce("Passage revealed. Grade your practice attempt.");
}
function gradeFlash(ok,ev){
  if(!fc.revealed){toast("Reveal the passage before grading");return;}
  const v=fc.deck[fc.i];
  if(ok){if(!(fc.retries[v.k]>0))fc.clean++;gameCredit(v.k,3,ev);}
  else{
    fc.missed++;const tries=fc.retries[v.k]||0;
    if(tries<1){fc.retries[v.k]=tries+1;fc.deck.push(v);toast("It will return once near the end of this round");}
    else toast("Good practice — move on and meet it fresh next round");
  }
  fc.i++;renderFlash();
}

/* Fill the Blanks */
let bl={};
function startBlanks(){
  if(!needSet(1,"Fill the Blanks"))return;
  bl={deck:samplePool(4),i:0,clean:0,wrong:0};
  renderBlanks();
}
function renderBlanks(){
  if(bl.i>=bl.deck.length)return results("Fill the Blanks",bl.clean,bl.deck.length,startBlanks,bl.wrong);
  const v=bl.deck[bl.i];
  const cap=practiceChunk(utext(v.k),v.k,WORDCAP_BLANKS,"blanks");
  const words=cap.words;
  const nBlanks=Math.min(6,Math.max(1,Math.floor(words.length/5)));
  const step=Math.max(2,Math.floor(words.length/(nBlanks+1)));
  const idxs=[];
  for(let x=Math.min(2,words.length-1);x<words.length&&idxs.length<nBlanks;x+=step)idxs.push(x);
  bl.cur={v,words,idxs,next:0,hadWrong:false,complete:false,touched:false,hintFor:-1,skipCounted:false,chunk:cap};
  const html=words.map((w,x)=>{
    const j=idxs.indexOf(x);
    if(j>-1)return `<span class="blank-slot ${j===0?'now':''}" id="slot${j}" aria-label="Missing word ${j+1}">?</span>`;
    return esc(w);
  }).join(" ")+(cap.truncated?" …":"");
  const bank=shuffle(idxs.map(x=>words[x])).map(w=>
    `<button class="chip" onclick="pickBlank(this,event)">${esc(w)}</button>`).join("");
  show(`
  <div class="screen">
    ${practiceTopbar("Fill the Blanks","blanks")}
    <div class="paper"><div class="ref-line">${v.ref} · ${cap.label}</div>
      <div class="scripture" id="blank-text">${html}</div></div>
    <div class="bank">${bank}</div>
    <div class="practice-recovery" aria-label="Help options">
      <button class="small-btn" id="blank-hint" onclick="blankHint()">Hint: next word</button>
      <button class="small-btn" onclick="askPracticeSkip('blanks')">Show answer & skip</button>
    </div>
    <div class="recovery-feedback" id="practice-feedback" role="status" aria-live="polite">Help keeps this section from counting as clean. Practice games never change mastery.</div>
  </div>`);
  document.getElementById("tb-pill").textContent=(bl.i+1)+" / "+bl.deck.length;
}
function pickBlank(btn,ev){
  const c=bl.cur;
  if(!c||c.complete||btn.disabled)return;
  c.touched=true;
  const clean=s=>s.replace(/[.,;:'"!?—–-]/g,"").toLowerCase();
  if(clean(btn.textContent)===clean(c.words[c.idxs[c.next]])){
    const slot=document.getElementById("slot"+c.next);
    slot.textContent=btn.textContent;slot.classList.add("filled");slot.classList.remove("now");
    btn.classList.add("used");btn.disabled=true;c.next++;
    if(c.next<c.idxs.length){document.getElementById("slot"+c.next).classList.add("now");practiceFeedback("Correct. Continue with the next missing word.");}
    else{
      c.complete=true;document.querySelectorAll(".bank .chip").forEach(b=>b.disabled=true);commitPracticeChunk(c.v.k,"blanks",c.chunk);
      if(!c.hadWrong)bl.clean++;
      const gained=gameCredit(c.v.k,c.hadWrong?3:5,ev);
      practiceFeedback((c.hadWrong?"Section complete with help. ":"Section completed cleanly. ")+(gained?"+"+gained+" practice oil; ":"Oil reserve full; ")+"mastery is unchanged.");
      later(()=>{bl.i++;renderBlanks();},900);
    }
  }else{
    c.hadWrong=true;bl.wrong++;practiceFeedback("Not that word yet — try another, or use a hint.");
    btn.classList.add("shake");later(()=>btn.classList.remove("shake"),350);
  }
}
function blankHint(){
  const c=bl.cur;if(!c||c.complete)return;c.touched=true;c.hadWrong=true;
  if(c.hintFor!==c.next){c.hintFor=c.next;bl.wrong++;}
  practiceFeedback("The next missing word is “"+c.words[c.idxs[c.next]]+"”. Choose it from the word bank.");
}

/* Verse Match */
let mt={};
function startMatch(){
  const byId=new Map();
  for(const unit of setUnits())for(const id of uids(unit.k))if(!byId.has(id))byId.set(id,{k:id,ref:uref(id),text:idText(id),due:isDue(unit.k)});
  const pool=[...byId.values()],due=shuffle(pool.filter(v=>v.due)),rest=shuffle(pool.filter(v=>!v.due));
  const pick=due.concat(rest).slice(0,Math.min(5,pool.length));
  if(pick.length<3){toast("Verse Match needs at least 3 individual verses in “"+activeSet().name+"”");history.back();return;}
  const sigs=new Map(),groupByKey={};
  pick.forEach(v=>{const sig=matchSig(v.text);if(!sigs.has(sig))sigs.set(sig,"g"+sigs.size);groupByKey[v.k]=sigs.get(sig);});
  mt={selRef:null,done:0,clean:0,miss:0,total:pick.length,pick,groupByKey,tainted:new Set()};
  const refs=shuffle([...pick]),txts=shuffle([...pick]);
  show(`
  <div class="screen">
    ${practiceTopbar("Verse Match","match")}
    <p class="hint-text" style="margin-bottom:10px">Tap a reference on the left, then tap the passage it belongs to.</p>
    <div class="match-grid">
      <div class="match-col">${refs.map(v=>`<button class="match-btn mref" data-id="${v.k}" data-group="${groupByKey[v.k]}" onclick="selRef(this)">${v.ref}</button>`).join("")}</div>
      <div class="match-col">${txts.map(v=>`<button class="match-btn" data-id="${v.k}" data-group="${groupByKey[v.k]}" onclick="selTxt(this,event)">${matchSnippet(v,pick)}${pick.filter(x=>matchSig(x.text)===matchSig(v.text)).length>1?'<span class="equiv-note">identical wording · either accepted</span>':""}</button>`).join("")}</div>
    </div>
  </div>`);
  document.getElementById("tb-pill").textContent="0 / "+mt.total;
}
function matchSig(t){return String(t).toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim();}
function matchSnippet(v,pick){
  const words=v.text.trim().split(/\s+/),others=pick.filter(x=>matchSig(x.text)!==matchSig(v.text));let n=Math.min(9,words.length);
  while(n<words.length&&others.some(x=>matchSig(x.text.trim().split(/\s+/).slice(0,n).join(" "))===matchSig(words.slice(0,n).join(" "))))n++;
  return esc(words.slice(0,n).join(" "))+(n<words.length?"…":"");
}
function selRef(btn){
  if(btn.disabled)return;
  document.querySelectorAll(".match-btn.mref").forEach(b=>b.classList.remove("sel"));
  btn.classList.add("sel");mt.selRef=btn;announce(btn.textContent+" selected");
}
function selTxt(btn,ev){
  if(btn.disabled)return;
  if(!mt.selRef){toast("Pick a reference first");return;}
  if(btn.dataset.group===mt.selRef.dataset.group){
    if(!mt.tainted.has(mt.selRef.dataset.id))mt.clean++;
    btn.classList.add("done");mt.selRef.classList.add("done");mt.selRef.classList.remove("sel");
    btn.disabled=true;mt.selRef.disabled=true;gameCredit(mt.selRef.dataset.id,2,ev);mt.selRef=null;mt.done++;
    document.getElementById("tb-pill").textContent=mt.done+" / "+mt.total;
    if(mt.done===mt.total){document.querySelectorAll(".match-btn").forEach(b=>b.disabled=true);later(()=>results("Verse Match",mt.clean,mt.total,startMatch,mt.miss),700);}
  }else{mt.miss++;mt.tainted.add(mt.selRef.dataset.id);announce("Not a match — try again");
    btn.classList.add("bad");later(()=>btn.classList.remove("bad"),350);}
}

/* Verse Builder */
let bd={};
function startVB(){
  if(!needSet(1,"Verse Builder"))return;
  bd={deck:samplePool(3),i:0,clean:0,wrong:0};
  renderVB();
}
function chunkPhrases(text){
  const words=text.trim().split(/\s+/);
  const out=[];let x=0;
  while(x<words.length){const n=2+Math.floor(Math.random()*2);out.push(words.slice(x,x+n).join(" "));x+=n;}
  return out;
}
function renderVB(){
  if(bd.i>=bd.deck.length)return results("Verse Builder",bd.clean,bd.deck.length,startVB,bd.wrong);
  const v=bd.deck[bd.i];
  const section=practiceChunk(utext(v.k),v.k,WORDCAP_BUILD,"builder");
  bd.cur={v,order:chunkPhrases(section.words.join(" ")),next:0,hadWrong:false,complete:false,touched:false,hintFor:-1,skipCounted:false,chunk:section};
  const chips=shuffle(bd.cur.order.map((p,ix)=>({p,ix}))).map(o=>
    `<button class="chip" data-ix="${o.ix}" onclick="pickPhrase(this,event)">${esc(o.p)}</button>`).join("");
  show(`
  <div class="screen">
    ${practiceTopbar("Verse Builder","builder")}
    <div class="paper" style="margin-bottom:14px"><div class="ref-line">${v.ref} · ${section.label}</div>
      <div class="scripture" style="font-size:.92rem;opacity:.75">Rebuild this rotating section of the passage, phrase by phrase.</div></div>
    <div class="built-line" id="built" aria-label="Your rebuilt passage" aria-live="polite"></div>
    <div class="bank">${chips}</div>
    <div class="practice-recovery" aria-label="Help options">
      <button class="small-btn" id="builder-hint" onclick="builderHint()">Hint: next phrase</button>
      <button class="small-btn" onclick="askPracticeSkip('builder')">Show answer & skip</button>
    </div>
    <div class="recovery-feedback" id="practice-feedback" role="status" aria-live="polite">Help keeps this section from counting as clean. Practice games never change mastery.</div>
  </div>`);
  document.getElementById("tb-pill").textContent=(bd.i+1)+" / "+bd.deck.length;
}
function pickPhrase(btn,ev){
  const c=bd.cur;
  if(!c||c.complete||btn.disabled)return;
  c.touched=true;
  if(normalizePhraseSearch(btn.textContent)===normalizePhraseSearch(c.order[c.next])){
    const span=document.createElement("span");span.className="chip";span.textContent=btn.textContent;
    document.getElementById("built").appendChild(span);
    btn.classList.add("used");btn.disabled=true;c.next++;
    if(c.next<c.order.length)practiceFeedback("Correct. Continue with the next phrase.");
    else{
      c.complete=true;document.querySelectorAll(".bank .chip").forEach(b=>b.disabled=true);commitPracticeChunk(c.v.k,"builder",c.chunk);
      if(!c.hadWrong)bd.clean++;
      const gained=gameCredit(c.v.k,c.hadWrong?3:5,ev);
      practiceFeedback((c.hadWrong?"Section complete with help. ":"Section completed cleanly. ")+(gained?"+"+gained+" practice oil; ":"Oil reserve full; ")+"mastery is unchanged.");
      later(()=>{bd.i++;renderVB();},900);
    }
  }else{c.hadWrong=true;bd.wrong++;practiceFeedback("Not that phrase yet — try another, or use a hint.");
    btn.classList.add("shake");later(()=>btn.classList.remove("shake"),350);}
}
function builderHint(){
  const c=bd.cur;if(!c||c.complete)return;c.touched=true;c.hadWrong=true;
  if(c.hintFor!==c.next){c.hintFor=c.next;bd.wrong++;}
  practiceFeedback("The next phrase is “"+c.order[c.next]+"”. Choose it from the phrase bank.");
}

/* ---------- RESULTS ---------- */
function results(mode,score,of,again,mistakes){
  ACTIVE_PRACTICE_MODE=null;PRACTICE_EXIT_ARMED=false;
  endRound();
  const perfect=score>=of&&!(mistakes>0);
  show(`
  <div class="screen results">${lampSVG()}
    <h1 class="big screen-title">${perfect?"The lamp burns brighter!":"Well practiced."}</h1>
    <p>${mode} — ${score} of ${of} completed cleanly${mistakes?` · ${mistakes} slip${mistakes===1?"":"s"} along the way`:""}</p>
    <p style="margin-top:6px;font-size:.78rem;opacity:.7">Games earn oil. To raise a passage's flame level, recite it in Daily Review.</p>
    <p style="margin-top:8px">🔥 ${P.streak.count}-day streak · Oil: <b style="color:var(--gold-light)">${P.oil}</b></p>
    <button class="primary-btn" onclick="home()">Return to the lamp</button>
    <button class="ghost-btn" onclick="(${again.name})()">Play again</button>
  </div>`);
}

boot();

import React,{createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
const C=createContext(null); const read=(k,f)=>{try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}};
export function AppProvider({children}){
 const [watchlist,setWatchlist]=useState(()=>read('zxh_watchlist',[])); const [history,setHistory]=useState(()=>read('zxh_history',[])); const [progress,setProgress]=useState(()=>read('zxh_progress',{}));
 const [recent,setRecent]=useState(()=>read('zxh_recent_searches',[])); const [profile,setProfile]=useState(()=>read('zxh_profile',{name:'ZXH Guest',country:'Pakistan',age:'—'}));
 const [prefs,setPrefs]=useState(()=>read('zxh_preferences',{language:'en-US'}));
 useEffect(()=>localStorage.setItem('zxh_watchlist',JSON.stringify(watchlist)),[watchlist]); useEffect(()=>localStorage.setItem('zxh_history',JSON.stringify(history)),[history]); useEffect(()=>localStorage.setItem('zxh_progress',JSON.stringify(progress)),[progress]); useEffect(()=>localStorage.setItem('zxh_recent_searches',JSON.stringify(recent)),[recent]); useEffect(()=>localStorage.setItem('zxh_profile',JSON.stringify(profile)),[profile]); useEffect(()=>localStorage.setItem('zxh_preferences',JSON.stringify(prefs)),[prefs]);
 const toggleList=useCallback(item=>setWatchlist(x=>x.some(a=>a.id===item.id&&a.media_type===item.media_type)?x.filter(a=>!(a.id===item.id&&a.media_type===item.media_type)):[...x,{...item,savedAt:Date.now()}]),[]);
 const inList=useCallback((id,type)=>watchlist.some(a=>a.id===Number(id)&&a.media_type===type),[watchlist]);
 const addRecent=useCallback(q=>setRecent(x=>[q,...x.filter(a=>a.toLowerCase()!==q.toLowerCase())].slice(0,8)),[]);
 const updateProgress=useCallback((key,data)=>setProgress(x=>({...x,[key]:{...x[key],...data,updatedAt:Date.now()}})),[]);
 const addHistory=useCallback(item=>setHistory(x=>[item,...x.filter(a=>a.id!==item.id||a.media_type!==item.media_type)].slice(0,50)),[]);
 const value=useMemo(()=>({watchlist,toggleList,inList,history,progress,updateProgress,addHistory,recent,addRecent,clearRecent:()=>setRecent([]),profile,setProfile,language:prefs.language,setLanguage:v=>setPrefs(p=>({...p,language:v}))}),[watchlist,toggleList,inList,history,progress,updateProgress,addHistory,recent,addRecent,profile,prefs.language]);
 return <C.Provider value={value}>{children}</C.Provider>
}
export const useApp=()=>useContext(C);

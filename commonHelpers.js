import"./assets/modulepreload-polyfill-ec808ebb.js";import{f as h,i as p}from"./assets/vendor-651d7991.js";const n=document.querySelector("#datetime-picker");n.disabled=!1;const e=document.querySelector("[data-start]");e.disabled=!0;const y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onChange(t){Date.now()<t[0].getTime()?(e.disabled=!1,t[0]):e.disabled=!0,console.log(t[0].getTime())},onClose(t){Date.now()>t[0].getTime()?p.error({title:"❌ You made a mistake",message:"Please choose a date in the future"}):Date.now()<t[0].getTime()&&e.addEventListener("click",()=>{C(t[0])})}};h(n,y);function C(t){const o=document.querySelector("[data-days]"),a=document.querySelector("[data-hours]"),s=document.querySelector("[data-minutes]"),r=document.querySelector("[data-seconds]"),u=setInterval(()=>{const{days:i,hours:d,minutes:c,seconds:l}=S(t.getTime()-Date.now());o.textContent=`${i}`.padStart(2,"0"),a.textContent=`${d}`.padStart(2,"0"),s.textContent=`${c}`.padStart(2,"0"),r.textContent=`${l}`.padStart(2,"0");function m(){return n.disabled=!0,parseInt(o.textContent)===0&&parseInt(a.textContent)===0&&parseInt(s.textContent)===0&&parseInt(r.textContent)===0}function f(){clearInterval(u)}m()===!0&&(f(),n.disabled=!1)},1e3);e.disabled=!0}function S(t){const u=Math.floor(t/864e5),i=Math.floor(t%864e5/36e5),d=Math.floor(t%864e5%36e5/6e4),c=Math.floor(t%864e5%36e5%6e4/1e3);return{days:u,hours:i,minutes:d,seconds:c}}
//# sourceMappingURL=commonHelpers.js.map
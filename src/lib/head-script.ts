import { LOOK_KEY, LOOKS } from "./looks";

export const COLORS_KEY = "colors";

// Runs in the head before the page paints, so a saved choice never flashes.
// ?colors=dark or ?colors=light in the address shows that version without
// saving it. ?look=boil picks a look and saves it, so a link to one look
// keeps it on every page after.
const colors = `(function(){var d=document.documentElement;d.classList.add('js');try{var q=new URLSearchParams(location.search).get('${COLORS_KEY}');var t=q||localStorage.getItem('${COLORS_KEY}');if(t==='light'||t==='dark')d.dataset.theme=t;}catch(e){}})();`;

const look = `(function(){var d=document.documentElement,k='${LOOK_KEY}',ok=${JSON.stringify(
  LOOKS.map((l) => l.value),
)};try{var q=new URLSearchParams(location.search).get(k);if(ok.indexOf(q)<0)q=null;if(q==='plain')localStorage.removeItem(k);else if(q)localStorage.setItem(k,q);var l=q||localStorage.getItem(k);if(l&&l!=='plain'&&ok.indexOf(l)>-1)d.dataset.look=l;}catch(e){}})();`;

export const headScript = colors + look;

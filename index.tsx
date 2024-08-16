import './index.css';
import ReactDOM from "react-dom/client";
import React, { useEffect, useState } from "react";
import Pa5sW0rd from './src/index';

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <App />
);

function App() {
  const [password, set_password] = useState('');
  const [length, set_length] = useState(24);

  const [u_is_enabled, set_u_is_enabled] = useState(true);
  const [u, set_u] = useState(0);
  const [u_min, set_u_min] = useState(1);
  const [u_max, set_u_max] = useState<number | undefined>(void 0);

  const [d_is_enabled, set_d_is_enabled] = useState(true);
  const [d, set_d] = useState(0);
  const [d_min, set_d_min] = useState(1);
  const [d_max, set_d_max] = useState<number | undefined>(0);

  const [s_is_enabled, set_s_is_enabled] = useState(true);
  const [s, set_s] = useState(0);
  const [s_min, set_s_min] = useState(1);
  const [s_max, set_s_max] = useState<number | undefined>(0);

  const generate = () => set_password(Pa5sW0rd({
    length,
    uppercase: u_is_enabled ? void 0 : 0,
    digits: d_is_enabled ? void 0 : 0,
    symbols: s_is_enabled ? void 0 : 0,
  }));

  const generatePin = () => set_password(Pa5sW0rd.pin(length));

  const copy = () => navigator.clipboard.writeText(password);

  useEffect(() => generate(), [length, d_min, d_max, u_is_enabled, d_is_enabled, s_is_enabled]);

  return <>
    <h1 className="name">{'Pa5sW0rd.'.split('').map((c, i) => <span className={getClassName(c)} key={i}>{c}</span>)}</h1>
    <h2 className="password" title={password}>{password.split('').map((c, i) => <span className={getClassName(c)} key={i}>{c}</span>)}</h2>
    <div className='row'>
      <label htmlFor="length-input">Length:&nbsp;{length}</label>
      <div className='range'>
        <input id='length-input' type='range' min={8} max={128} step={1} value={length} onChange={(e) => set_length(Number(e.target.value))} />
      </div>
    </div>
    <div className='row'>
      <input type='checkbox' id='u_is_enabled' checked={u_is_enabled} onChange={(e) => set_u_is_enabled(e.target.checked)} />&nbsp;<label htmlFor='u_is_enabled'>uppercase</label>
    </div>
    <div className='row'>
      <input type='checkbox' id='d_is_enabled' checked={d_is_enabled} onChange={(e) => set_d_is_enabled(e.target.checked)} />&nbsp;<label htmlFor='d_is_enabled'>digits</label>
    </div>
    <div className='row'>
      <input type='checkbox' id='s_is_enabled' checked={s_is_enabled} onChange={(e) => set_s_is_enabled(e.target.checked)} />&nbsp;<label htmlFor='s_is_enabled'>symbols</label>
    </div>
    <div>
      <button className="regenerate" type="button" onClick={() => generate()}>
        <svg width="2rem" height="2rem" viewBox="0 0 102.455 102.455">
          <path d="M61.977,17.156L48.277,30.855c-0.789,0.79-2.074,0.79-2.866,0l-0.197-0.202V20.568 c-16.543,1.156-29.65,14.975-29.65,31.806c0,11.82,6.487,22.617,16.937,28.175c2.631,1.402,3.631,4.671,2.233,7.31 c-1.403,2.635-4.671,3.634-7.306,2.231c-13.983-7.44-22.67-21.889-22.67-37.716c0-22.792,17.953-41.47,40.457-42.641V0.792 l0.197-0.199c0.792-0.79,2.077-0.79,2.866,0l13.699,13.696C62.771,15.083,62.771,16.369,61.977,17.156z" />
          <path d="M54.174,101.861L40.477,88.166c-0.792-0.79-0.792-2.074,0-2.864l13.697-13.695c0.791-0.794,2.074-0.794,2.868,0 l0.191,0.198l0.007,10.082C73.776,80.733,86.89,66.918,86.89,50.084c0-11.82-6.491-22.614-16.939-28.175 c-2.635-1.4-3.635-4.675-2.234-7.31c1.406-2.635,4.678-3.634,7.312-2.231c13.979,7.44,22.669,21.892,22.669,37.716 c0,22.794-17.953,41.469-40.457,42.636v8.942l-0.198,0.198C56.248,102.652,54.965,102.652,54.174,101.861z" />
        </svg>
      </button>
    </div>
    <div>
      <button className="copy" type="button" onClick={() => copy()}>
        <svg width="2rem" height="3.2rem" viewBox="0 0 16 16"><path d="M13.49 3 10.74.37A1.22 1.22 0 0 0 9.86 0h-4a1.25 1.25 0 0 0-1.22 1.25v11a1.25 1.25 0 0 0 1.25 1.25h6.72a1.25 1.25 0 0 0 1.25-1.25V3.88a1.22 1.22 0 0 0-.37-.88zm-.88 9.25H5.89v-11h2.72v2.63a1.25 1.25 0 0 0 1.25 1.25h2.75zm0-8.37H9.86V1.25l2.75 2.63z" /><path d="M10.11 14.75H3.39v-11H4V2.5h-.61a1.25 1.25 0 0 0-1.25 1.25v11A1.25 1.25 0 0 0 3.39 16h6.72a1.25 1.25 0 0 0 1.25-1.25v-.63h-1.25z" /></svg>
      </button>
    </div>
    <div className='message'>
      Message!
    </div>
  </>
}

function getClassName(c: string): string {
  if (/[a-z]{1}/.test(c)) {
    return 'l';
  } else if (/[A-Z]{1}/.test(c)) {
    return 'u';
  } else if (/\d{1}/.test(c)) {
    return 'd';
  } else {
    return 's';
  }
}

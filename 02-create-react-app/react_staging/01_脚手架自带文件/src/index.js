import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// 用于记录页面性能
import reportWebVitals from './reportWebVitals';

// React.StrictMode 检测 APP 组件 以及其 子组件 中的代码是否存在不合理的地方
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

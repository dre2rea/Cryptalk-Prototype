import{j as s}from"./jsx-runtime-B9ANUUVY.js";import"./iframe-DT-aX9mF.js";import"./preload-helper-PPVm8Dsz.js";function a({label:t,variant:n="primary",onClick:o}){return s.jsx("button",{onClick:o,className:`px-4 py-2 rounded-lg font-medium transition-colors ${n==="primary"?"bg-accent text-white hover:opacity-90":"bg-surface-secondary text-text-primary border border-border hover:bg-surface-primary"}`,children:t})}a.__docgenInfo={description:"",methods:[],displayName:"Button",props:{label:{required:!0,tsType:{name:"string"},description:""},variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const p={title:"Components/Button",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["primary","secondary"]}}},r={args:{label:"Button",variant:"primary"}},e={args:{label:"Button",variant:"secondary"}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Button',
    variant: 'primary'
  }
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Button',
    variant: 'secondary'
  }
}`,...e.parameters?.docs?.source}}};const d=["Primary","Secondary"];export{r as Primary,e as Secondary,d as __namedExportsOrder,p as default};

/// <reference types="vite/client" />

// SVG 파일을 React 컴포넌트로 import할 때 타입 선언
declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

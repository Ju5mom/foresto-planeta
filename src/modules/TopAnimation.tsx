import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, MotionPathPlugin); // register the hook to avoid React version discrepancies

const container = useRef(null);

useGSAP(() => {
  
});
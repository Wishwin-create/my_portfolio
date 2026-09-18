import {useEffect, useRef, useState} from 'react';

export function useCountUp(target,isActive,duration=2000){
    const [value,setValue] = useState(0);
    const startedRef =useRef(false);

    useEffect(()=>
    {
    if(!isActive || startedRef.current) return;
    startedRef.current = true;
    const startTime = performance.now();

    const step = (now)=>{
        const elapsed = now - startTime;
        const progress = Math.min(elapsed/duration,1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        setValue(Math.round(eased * target));
        if(progress < 1){
            requestAnimationFrame(step);
        }
    };
    requestAnimationFrame(step);

    },[isActive,target,duration]);
    return value;
}
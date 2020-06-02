import { useEffect, EffectCallback } from "react";

const useMountEffect = (fun: EffectCallback) => useEffect(fun, []);

export default useMountEffect;

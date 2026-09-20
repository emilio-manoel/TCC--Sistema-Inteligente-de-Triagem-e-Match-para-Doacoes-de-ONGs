import type { InputHTMLAttributes } from "react";

import { Divider } from "./Divider";
import { Button } from "./Button";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  suffix?: string;
  className?: string;
  onClickSuffix?:() => void;
}

export function Input({ suffix, onClickSuffix, className, disabled, ...rest}: InputProps) {
  return (
    <div className={['bg-input flex items-center rounded-2xl p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]', disabled ? 'opacity-60' : '', className].join(' ')}>
      <input
        className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none disabled:cursor-not-allowed "
        
        disabled={disabled}
        {...rest}
      />
      {suffix && (
        <>
          <Divider orientation="vertical" />
          <Button 
            type="button" 
            disabled={disabled}
            onClick={onClickSuffix}
            className="text-muted-foreground text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed">
            {suffix}
          </Button>
        </>
      )}
    </div>
  );
}

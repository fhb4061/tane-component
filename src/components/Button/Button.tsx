import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { cn } from '../../util/tailwind-util';

const buttonVairants = cva(
  "inline-flex cursor-pointer items-center justify-center rounded-sm border-0 px-4 py-3 font-sans text-base font-semibold leading-none transition-[transform,box-shadow,background-color,color] duration-150 ease-out hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ui-ring disabled:cursor-not-allowed disabled:opacity-55 disabled:transform-none",
  {
    variants: {
      variant: {
        primary: "bg-ui-brand text-ui-brand-foreground shadow-ui-primary hover:bg-ui-brand-hover",
        secondary: "bg-ui-surface text-ui-fg shadow-ui-secondary hover:bg-ui-surface-hover"
      },
      size: {
        small: ['text-sm', 'py-1', 'px-2'],
        medium: ['text-base', 'py-2', 'px-4']
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "medium"
    }
  }
);

export type ButtonProps = VariantProps<typeof buttonVairants>
  & ButtonHTMLAttributes<HTMLButtonElement>
  & PropsWithChildren;

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  ...props
}: ButtonProps) {

  return (
    <button
      className={cn(buttonVairants({ variant, size }))}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

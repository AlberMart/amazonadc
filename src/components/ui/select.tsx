'use client'

import { cn } from '@/utilities/ui'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import * as React from 'react'

const Select: React.FC<React.ComponentProps<typeof SelectPrimitive.Root>> = (props) => {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

const SelectGroup: React.FC<React.ComponentProps<typeof SelectPrimitive.Group>> = (props) => {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

const SelectValue: React.FC<React.ComponentProps<typeof SelectPrimitive.Value>> = (props) => {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

const SelectTrigger: React.FC<React.ComponentProps<typeof SelectPrimitive.Trigger>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        'site-select-trigger relative flex h-11 w-full items-center justify-between gap-2 rounded-md border border-[var(--site-border)] bg-white py-2 pr-10 pl-3 text-base text-[var(--site-heading)] shadow-none outline-none transition-[border-color,box-shadow] focus-visible:border-[var(--site-tertiary)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--site-tertiary)_35%,transparent)] disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-[var(--site-muted-text)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex-1 *:data-[slot=select-value]:text-left [&_svg]:pointer-events-none [&_svg]:shrink-0',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[var(--site-muted-text)]"
          aria-hidden
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

const SelectContent: React.FC<React.ComponentProps<typeof SelectPrimitive.Content>> = ({
  children,
  className,
  position = 'popper',
  ...props
}) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'site-select-content relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-[var(--site-border)] bg-white text-[var(--site-heading)] shadow-[0_12px_32px_rgba(11,28,44,0.14)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

const SelectLabel: React.FC<React.ComponentProps<typeof SelectPrimitive.Label>> = ({
  className,
  ...props
}) => {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('px-3 py-2 text-xs font-semibold tracking-wide text-[var(--site-muted-text)] uppercase', className)}
      {...props}
    />
  )
}

const SelectItem: React.FC<React.ComponentProps<typeof SelectPrimitive.Item>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-pointer items-center rounded-sm py-2.5 pr-10 pl-3 text-sm outline-none select-none focus:bg-[var(--site-muted)] focus:text-[var(--site-heading)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-[var(--site-muted)] data-[highlighted]:text-[var(--site-heading)]',
        className,
      )}
      {...props}
    >
      <span className="absolute right-3 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4 text-[var(--site-tertiary)]" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

const SelectSeparator: React.FC<React.ComponentProps<typeof SelectPrimitive.Separator>> = ({
  className,
  ...props
}) => {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('pointer-events-none -mx-1 my-1 h-px bg-[var(--site-border)]', className)}
      {...props}
    />
  )
}

const SelectScrollUpButton: React.FC<
  React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>
> = ({ className, ...props }) => {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1 text-[var(--site-muted-text)]', className)}
      {...props}
    >
      <ChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

const SelectScrollDownButton: React.FC<
  React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>
> = ({ className, ...props }) => {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1 text-[var(--site-muted-text)]', className)}
      {...props}
    >
      <ChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

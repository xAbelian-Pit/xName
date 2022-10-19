import clsx from 'clsx'
import React, { ReactNode } from 'react'

interface ContainerParams {
  children: ReactNode | ReactNode[],
  className?: string,
  flex?: boolean,
  flexRow?: boolean,
  id?: string,
}

export default function Container({
  children, className = '', flex = false, flexRow = false, id = '',
}: ContainerParams) {
  return (
    <div
      id={id}
      className={clsx(
        'p-5 w-full max-w-6xl ml-auto mr-auto',
        flex && 'flex flex-col',
        flexRow && 'flex flex-row',
        className,
      )}
    >
      {children}
    </div>
  )
}

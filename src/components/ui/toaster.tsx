"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme="system"
            className="toaster group"
            richColors
            toastOptions={{
                classNames: {
                    toast:
                        "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-950 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-gray-950 dark:group-[.toaster]:text-gray-50 dark:group-[.toaster]:border-gray-800 data-[type=error]:bg-red-600 data-[type=error]:border-red-600 data-[type=error]:text-white data-[type=success]:bg-green-600 data-[type=success]:border-green-600 data-[type=success]:text-white data-[type=warning]:bg-yellow-500 data-[type=warning]:border-yellow-500 data-[type=warning]:text-white data-[type=info]:bg-blue-600 data-[type=info]:border-blue-600 data-[type=info]:text-white",
                    description: "group-[.toast]:text-gray-500 dark:group-[.toast]:text-gray-400",
                    actionButton:
                        "group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50 dark:group-[.toast]:bg-gray-50 dark:group-[.toast]:text-gray-900",
                    cancelButton:
                        "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 dark:group-[.toast]:bg-gray-800 dark:group-[.toast]:text-gray-400",
                },
            }}
            {...props}
        />
    )
}

export { Toaster }

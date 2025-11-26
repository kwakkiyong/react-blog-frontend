"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  toastVariants,
  ToastViewport,
} from "@/components/ui/toast";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

export function Toaster() {
  const { toasts } = useToast();

  const getIcon = (variant?: VariantProps<typeof toastVariants>["variant"]) => {
    switch (variant) {
      case "success":
        return (
          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
        );
      case "error":
        return <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />;
      default:
        return <Info className="h-5 w-5 text-gray-600 flex-shrink-0" />;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3">
              {getIcon(variant)}
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

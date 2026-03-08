'use client';

import React from 'react';
import { Control, FieldPath, FieldValues } from 'react-hook-form';
import { LucideIcon } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FileUploaderProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  acceptTypes: string[];
  disabled?: boolean;
  icon: LucideIcon;
  placeholder: string;
  hint: string;
}

const FileUploader = <T extends FieldValues>({
  control,
  name,
  label,
  acceptTypes,
  disabled,
  icon: Icon,
  placeholder,
  hint,
}: FileUploaderProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <FormLabel className="form-label">{label}</FormLabel>
          <FormControl>
            <div className="flex flex-col gap-4">
              <div
                className={cn(
                  'flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all hover:bg-slate-50',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
                onClick={() => !disabled && document.getElementById(name)?.click()}
              >
                <Icon className="w-10 h-10 text-slate-400 mb-4" />
                <p className="text-slate-600 font-medium">{placeholder}</p>
                <p className="text-slate-400 text-sm mt-1">{hint}</p>
                <Input
                  id={name}
                  type="file"
                  accept={acceptTypes.join(',')}
                  className="hidden"
                  disabled={disabled}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                />
              </div>
              {value && (value as any) instanceof File && (
                <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-lg">
                  <span className="text-sm text-slate-700 truncate">{(value as File).name}</span>
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileUploader;

'use client'

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Image as ImageIcon, X } from "lucide-react";

import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LoadingOverlay from "@/components/LoadingOverlay";
import { cn } from "@/lib/utils";
import { MAX_IMAGE_BYTES, MAX_PDF_BYTES } from "@/lib/constant";

const formSchema = z.object({
  pdfFile: z
    .instanceof(File, { message: "PDF file is required" })
    .refine((file) => file.type === "application/pdf", "Only PDF files are allowed")
    .refine((file) => file.size <= MAX_PDF_BYTES, `PDF file must be less than ${MAX_PDF_BYTES / (1024 * 1024)}MB`),
  coverImage: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.type.startsWith("image/"), "Only image files are allowed")
    .refine((file) => !file || file.size <= MAX_IMAGE_BYTES, `Image file must be less than ${MAX_IMAGE_BYTES / (1024 * 1024)}MB`),
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author name is required"),
  voice: z.string().min(1, "Please choose a voice"),
});

const voices = [
  { 
    group: "Male Voices", 
    options: [
      { id: "dave", name: "Dave", description: "Young male, British-Essex, casual & conversational" },
      { id: "daniel", name: "Daniel", description: "Middle-aged male, British, authoritative but warm" },
      { id: "chris", name: "Chris", description: "Male, casual & easy-going" },
    ]
  },
  { 
    group: "Female Voices", 
    options: [
      { id: "rachel", name: "Rachel", description: "Young female, American, calm & clear" },
      { id: "sarah", name: "Sarah", description: "Young female, American, soft & approachable" },
    ]
  }
];

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfName, setPdfName] = useState<string | null>(null);
  const [coverName, setCoverName] = useState<string | null>(null);

  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      voice: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    field: "pdfFile" | "coverImage",
    onChange: (...event: any[]) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      if (field === "pdfFile") setPdfName(file.name);
      else setCoverName(file.name);
    }
  };

  const removeFile = (field: "pdfFile" | "coverImage") => {
    if (field === "pdfFile") {
        form.setValue("pdfFile", undefined);
        setPdfName(null);
        if (pdfInputRef.current) pdfInputRef.current.value = "";
    } else {
        form.setValue("coverImage", undefined);
        setCoverName(null);
        if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  return (
    <div className="new-book-wrapper">
      {isSubmitting && <LoadingOverlay />}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* PDF Upload */}
          <FormField
            control={form.control}
            name="pdfFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Book PDF File</FormLabel>
                <FormControl>
                  <div className={cn(
                    "upload-dropzone border-2 border-dashed border-[#8B7355]/20",
                    pdfName && "upload-dropzone-uploaded"
                  )}>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      id="pdf-upload"
                      ref={pdfInputRef}
                      onChange={(e) => handleFileChange(e, "pdfFile", field.onChange)}
                    />
                    {pdfName ? (
                      <div className="flex flex-col items-center">
                        <Upload className="upload-dropzone-icon" />
                        <div className="flex items-center gap-2">
                            <span className="upload-dropzone-text truncate max-w-[200px]">{pdfName}</span>
                            <button 
                                type="button" 
                                onClick={() => removeFile("pdfFile")}
                                className="upload-dropzone-remove"
                                aria-label="Remove PDF file"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
                      </div>
                    ) : (
                      <label htmlFor="pdf-upload" className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
                        <Upload className="upload-dropzone-icon" />
                        <span className="upload-dropzone-text">Click to upload PDF</span>
                        <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
                      </label>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image Upload */}
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Cover Image (Optional)</FormLabel>
                <FormControl>
                  <div className={cn(
                    "upload-dropzone border-2 border-dashed border-[#8B7355]/20",
                    coverName && "upload-dropzone-uploaded"
                  )}>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="cover-upload"
                      ref={coverInputRef}
                      onChange={(e) => handleFileChange(e, "coverImage", field.onChange)}
                    />
                    {coverName ? (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="upload-dropzone-icon" />
                        <div className="flex items-center gap-2">
                            <span className="upload-dropzone-text truncate max-w-[200px]">{coverName}</span>
                            <button 
                                type="button" 
                                onClick={() => removeFile("coverImage")}
                                className="upload-dropzone-remove"
                                aria-label="Remove cover image"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <p className="upload-dropzone-hint">Leave empty to auto-generate from PDF</p>
                      </div>
                    ) : (
                      <label htmlFor="cover-upload" className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
                        <ImageIcon className="upload-dropzone-icon" />
                        <span className="upload-dropzone-text">Click to upload cover image</span>
                        <p className="upload-dropzone-hint">Leave empty to auto-generate from PDF</p>
                      </label>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Title Input */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ex: Rich Dad Poor Dad" 
                    className="form-input" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Input */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label">Author Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="ex: Robert Kiyosaki" 
                    className="form-input" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Voice Selector */}
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-6"
                  >
                    {voices.map((group) => (
                      <div key={group.group} className="space-y-3">
                        <h4 className="text-sm font-medium text-[var(--text-secondary)]">{group.group}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {group.options.map((option) => (
                            <FormItem key={option.id}>
                              <FormControl>
                                <RadioGroupItem
                                  value={option.id}
                                  id={option.id}
                                  className="sr-only"
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={option.id}
                                className={cn(
                                  "voice-selector-option flex flex-col items-start gap-1 p-4 h-full",
                                  field.value === option.id 
                                    ? "voice-selector-option-selected" 
                                    : "voice-selector-option-default"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={cn(
                                    "w-4 h-4 rounded-full border border-[#8B7355] flex items-center justify-center",
                                    field.value === option.id && "bg-[#663820] border-[#663820]"
                                  )}>
                                    {field.value === option.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                  <span className="font-bold text-[#212a3b]">{option.name}</span>
                                </div>
                                <span className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                  {option.description}
                                </span>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="form-btn">
            Begin Synthesis
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;

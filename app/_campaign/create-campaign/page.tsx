"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Trash2, Upload, Plus, AlertCircle } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

// Define types for startup data
interface StartupData {
  name: string;
  tagline: string;
  category: string;
  stage: string;
  logo: string;
  banner: string;
  website: string;
  twitter: string;
  github: string;
  discord?: string;
  medium?: string;
  telegram?: string;
  whitepaper?: string;
  pitchDeck?: string;
  pitchDemoVideo?: string;
  tokenPrice?: string;
}

// Define FAQ type
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// Define form schemas for each step
const step1Schema = z.object({
  startupName: z.string().min(1, "Startup name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  category: z.string().min(1, "Category is required"),
  startupStage: z.string().min(1, "Startup stage is required"),
  logo: z.string().min(1, "Logo is required"),
  banner: z.string().min(1, "Banner is required"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  twitter: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  github: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  discord: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  medium: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  telegram: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  whitepaper: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  pitchDeck: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  pitchDemoVideo: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

const step2Schema = z.object({
  fundraisingTarget: z.string().min(1, "Fundraising target is required"),
  fundraisingWallet: z.string().min(1, "Fundraising wallet is required"),
  acceptedCurrencyType: z.string().min(1, "Currency type is required"),
  fullyDilutedValuation: z.string().min(1, "Fully diluted valuation is required"),
  initialMarketCap: z.string().min(1, "Initial market cap is required"),
  vestingSummary: z.string().min(1, "Vesting summary is required"),
  fundingDeadline: z.date({
    required_error: "Funding deadline is required",
  }),
  headerImage: z.string().min(1, "Header image is required"),
  dealName: z.string().min(1, "Deal name is required"),
  dealRound: z.string().min(1, "Deal round is required"),
  tokenPrice: z.string().min(1, "Token price is required"),
});

const step3Schema = z.object({
  faqs: z.array(
    z.object({
      id: z.string(),
      question: z.string().min(1, "Question is required"),
      answer: z.string().min(1, "Answer is required"),
    })
  ).min(1, "At least one FAQ is required").max(5, "Maximum 5 FAQs allowed"),
});

// Combine all schemas
const formSchema = z.object({
  ...step1Schema.shape,
  ...step2Schema.shape,
  ...step3Schema.shape,
});

export default function CreateCampaignPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [startupData, setStartupData] = useState<StartupData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: "1", question: "", answer: "" },
  ]);
  const [faqErrors, setFaqErrors] = useState<{[key: string]: {question?: string, answer?: string}} | null>(null);

  // Initialize form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(
      currentStep === 1
        ? step1Schema
        : currentStep === 2
        ? step2Schema
        : step3Schema
    ),
    defaultValues: {
      startupName: "",
      tagline: "",
      category: "",
      startupStage: "",
      logo: "",
      banner: "",
      website: "",
      twitter: "",
      github: "",
      discord: "",
      medium: "",
      telegram: "",
      whitepaper: "",
      pitchDeck: "",
      pitchDemoVideo: "",
      fundraisingTarget: "",
      fundraisingWallet: "",
      acceptedCurrencyType: "",
      fullyDilutedValuation: "",
      initialMarketCap: "",
      vestingSummary: "",
      headerImage: "",
      dealName: "",
      dealRound: "",
      tokenPrice: "",
      faqs: [{ id: "1", question: "", answer: "" }],
    },
  });

  // Fetch startup data from API
  useEffect(() => {
    const fetchStartupData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/startup");
        const data = await response.json();
        setStartupData(data);
        
        // Pre-fill form with startup data
        form.setValue("startupName", data.name);
        form.setValue("tagline", data.tagline);
        form.setValue("category", data.category);
        form.setValue("startupStage", data.stage);
        form.setValue("logo", data.logo);
        form.setValue("banner", data.banner);
        form.setValue("website", data.website || "");
        form.setValue("twitter", data.twitter || "");
        form.setValue("github", data.github || "");
        form.setValue("discord", data.discord || "");
        form.setValue("medium", data.medium || "");
        form.setValue("telegram", data.telegram || "");
        form.setValue("whitepaper", data.whitepaper || "");
        form.setValue("pitchDeck", data.pitchDeck || "");
        form.setValue("pitchDemoVideo", data.pitchDemoVideo || "");
        form.setValue("tokenPrice", data.tokenPrice || "");
        form.setValue("headerImage", data.banner);
      } catch (error) {
        console.error("Error fetching startup data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStartupData();
  }, [form]);

  // Validate FAQs
  const validateFaqs = () => {
    const errors: {[key: string]: {question?: string, answer?: string}} = {};
    let hasErrors = false;
    
    faqs.forEach((faq) => {
      const faqError: {question?: string, answer?: string} = {};
      
      if (!faq.question.trim()) {
        faqError.question = "Question is required";
        hasErrors = true;
      }
      
      if (!faq.answer.trim()) {
        faqError.answer = "Answer is required";
        hasErrors = true;
      }
      
      if (Object.keys(faqError).length > 0) {
        errors[faq.id] = faqError;
      }
    });
    
    setFaqErrors(hasErrors ? errors : null);
    return !hasErrors;
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (currentStep === 3) {
      // Validate FAQs before final submission
      if (!validateFaqs()) {
        return;
      }
      
      // Update the form values with the current FAQs
      form.setValue("faqs", faqs);
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          faqs: faqs,
        }),
      });

      if (response.ok) {
        // Redirect to campaigns page or show success message
        router.push("/campaigns");
      } else {
        console.error("Failed to create campaign");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  // Handle adding a new FAQ
  const addFaq = () => {
    if (faqs.length < 5) {
      const newFaqs = [
        ...faqs,
        { id: `${Date.now()}`, question: "", answer: "" },
      ];
      setFaqs(newFaqs);
      form.setValue("faqs", newFaqs);
    }
  };

  // Handle removing an FAQ
  const removeFaq = (id: string) => {
    if (faqs.length > 1) {
      const newFaqs = faqs.filter((faq) => faq.id !== id);
      setFaqs(newFaqs);
      form.setValue("faqs", newFaqs);
      
      // Remove errors for the deleted FAQ
      if (faqErrors && faqErrors[id]) {
        const newErrors = { ...faqErrors };
        delete newErrors[id];
        setFaqErrors(Object.keys(newErrors).length > 0 ? newErrors : null);
      }
    }
  };

  // Update form values when FAQs change
  const updateFaq = (id: string, field: "question" | "answer", value: string) => {
    const updatedFaqs = faqs.map((faq) =>
      faq.id === id ? { ...faq, [field]: value } : faq
    );
    setFaqs(updatedFaqs);
    form.setValue("faqs", updatedFaqs);
    
    // Clear error for this field if it exists
    if (faqErrors && faqErrors[id] && faqErrors[id][field]) {
      const newErrors = { ...faqErrors };
      delete newErrors[id][field];
      
      if (Object.keys(newErrors[id]).length === 0) {
        delete newErrors[id];
      }
      
      setFaqErrors(Object.keys(newErrors).length > 0 ? newErrors : null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b14] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">Create New Campaign</h1>
        <p className="text-gray-400 mb-6">
          {currentStep === 1
            ? "Enter basic information about your campaign"
            : currentStep === 2
            ? "Add media and external links"
            : "Set funding goals and timeline"}
        </p>

        {/* Step indicators */}
        <div className="flex items-center mb-8">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
            currentStep >= 1 ? "bg-blue-600" : "bg-gray-700"
          }`}>
            1
          </div>
          <div className={`h-1 w-12 ${
            currentStep >= 2 ? "bg-blue-600" : "bg-gray-700"
          }`}></div>
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
            currentStep >= 2 ? "bg-blue-600" : "bg-gray-700"
          }`}>
            2
          </div>
          <div className={`h-1 w-12 ${
            currentStep >= 3 ? "bg-blue-600" : "bg-gray-700"
          }`}></div>
          <div className={`rounded-full w-8 h-8 flex items-center justify-center ${
            currentStep >= 3 ? "bg-blue-600" : "bg-gray-700"
          }`}>
            3
          </div>
          <div className="ml-auto">
            Step {currentStep} of 3
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <>
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Campaign Overview</h2>
                  
                  <FormField
                    control={form.control}
                    name="startupName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Name (Fetched from Startup page)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tagline (Fetched from Startup page)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category (Fetched from Startup page)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startupStage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Stage (Fetched from Startup page - can be edited)</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                              <SelectValue placeholder="Select startup stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                            <SelectItem value="idea">Idea</SelectItem>
                            <SelectItem value="mvp">MVP</SelectItem>
                            <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                            <SelectItem value="seed">Seed</SelectItem>
                            <SelectItem value="series-a">Series A</SelectItem>
                            <SelectItem value="growth">Growth</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <h2 className="text-xl font-semibold pt-4">Media & Branding</h2>
                  
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Startup Logo (Fetched from Startup page)</FormLabel>
                        <FormControl>
                          <div className="border border-dashed border-[#2e2f45] rounded-md p-6 flex flex-col items-center justify-center bg-[#1a1b2e]">
                            {field.value ? (
                              <div className="relative w-full">
                                <img
                                  src={field.value || "/placeholder.svg"}
                                  alt="Logo"
                                  className="mx-auto h-20 w-20 object-contain"
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-gray-400">
                                <Upload className="h-10 w-10 mb-2" />
                                <p>Upload your campaign logo</p>
                                <p className="text-xs mt-1">PNG, JPG, SVG up to 5MB</p>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="banner"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Startup Banner (Fetched from Startup page - can change if needed)</FormLabel>
                        <FormControl>
                          <div className="border border-dashed border-[#2e2f45] rounded-md p-6 flex flex-col items-center justify-center bg-[#1a1b2e]">
                            {value ? (
                              <div className="relative w-full">
                                <img
                                  src={value || "/placeholder.svg"}
                                  alt="Banner"
                                  className="mx-auto h-32 w-full object-cover rounded-md"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                                  onClick={() => {
                                    // Open file picker
                                    const input = document.createElement("input");
                                    input.type = "file";
                                    input.accept = "image/*";
                                    input.onchange = (e) => {
                                      const file = (e.target as HTMLInputElement).files?.[0];
                                      if (file) {
                                        // In a real app, you'd upload this file to your server/storage
                                        // For demo purposes, we'll create a local URL
                                        const url = URL.createObjectURL(file);
                                        onChange(url);
                                      }
                                    };
                                    input.click();
                                  }}
                                >
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-gray-400">
                                <Upload className="h-10 w-10 mb-2" />
                                <p>Upload your campaign banner</p>
                                <p className="text-xs mt-1">Recommended size: 1200×400px</p>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <h2 className="text-xl font-semibold pt-4">URLs</h2>
                  
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://yourproject.com"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://twitter.com/yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="github"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://github.com/yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discord"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discord</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://discord.gg/yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medium"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medium</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://medium.com/yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telegram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telegram</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://t.me/yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whitepaper"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Whitepaper</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://yourproject.com/whitepaper.pdf"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pitchDeck"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pitch Deck</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://yourproject.com/pitch-deck.pdf"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pitchDemoVideo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pitch Demo Video</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://youtube.com/watch?v=yourproject"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {/* Step 2: Funding Details */}
            {currentStep === 2 && (
              <>
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Funding Details</h2>
                  
                  <FormField
                    control={form.control}
                    name="fundraisingTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fundraising Target</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="100000"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fundraisingWallet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fundraising Wallet (immutable)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="0x..."
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceptedCurrencyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Accepted Currency Type</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                            <SelectItem value="usdc">USDC</SelectItem>
                            <SelectItem value="usdt">USDT</SelectItem>
                            <SelectItem value="eth">ETH</SelectItem>
                            <SelectItem value="bnb">BNB</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullyDilutedValuation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fully Diluted Valuation ($)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="1000000"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="initialMarketCap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Initial Market Cap ($)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="500000"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="vestingSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vesting Summary</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Describe the vesting schedule for tokens"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fundingDeadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Funding Deadline (max 1 month)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal bg-[#1a1b2e] border-[#2e2f45] text-white",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>MM/DD/YYYY</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-[#1a1b2e] border-[#2e2f45]" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => {
                                // Disable dates more than 1 month in the future
                                const maxDate = new Date();
                                maxDate.setMonth(maxDate.getMonth() + 1);
                                return date < new Date() || date > maxDate;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <h2 className="text-xl font-semibold pt-4">Deal Details</h2>
                  
                  <FormField
                    control={form.control}
                    name="headerImage"
                    render={({ field: { value, onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel>Header Image</FormLabel>
                        <FormControl>
                          <div className="border border-dashed border-[#2e2f45] rounded-md p-6 flex flex-col items-center justify-center bg-[#1a1b2e]">
                            {value ? (
                              <div className="relative w-full">
                                <img
                                  src={value || "/placeholder.svg"}
                                  alt="Header"
                                  className="mx-auto h-32 w-full object-cover rounded-md"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                                  onClick={() => {
                                    // Open file picker
                                    const input = document.createElement("input");
                                    input.type = "file";
                                    input.accept = "image/*";
                                    input.onchange = (e) => {
                                      const file = (e.target as HTMLInputElement).files?.[0];
                                      if (file) {
                                        // In a real app, you'd upload this file to your server/storage
                                        // For demo purposes, we'll create a local URL
                                        const url = URL.createObjectURL(file);
                                        onChange(url);
                                      }
                                    };
                                    input.click();
                                  }}
                                >
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center text-gray-400">
                                <Upload className="h-10 w-10 mb-2" />
                                <p>Upload your header image</p>
                                <p className="text-xs mt-1">Recommended size: 1200×400px</p>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dealName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deal Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter deal name"
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dealRound"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deal Round</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                              <SelectValue placeholder="Select deal round" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                            <SelectItem value="seed">Seed</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="ido">IDO</SelectItem>
                            <SelectItem value="ico">ICO</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tokenPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token Price (fetched from startup)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-[#1a1b2e] border-[#2e2f45] text-white"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {/* Step 3: FAQs */}
            {currentStep === 3 && (
              <>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold">FAQ</h2>
                      <Badge variant="outline" className="bg-[#1a1b2e] border-[#2e2f45]">
                        {faqs.length}/5 Questions
                      </Badge>
                    </div>
                    {faqs.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addFaq}
                        className="bg-[#1a1b2e] border-[#2e2f45] hover:bg-[#2e2f45]"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add FAQ
                      </Button>
                    )}
                  </div>

                  <Card className="bg-[#1a1b2e] border-[#2e2f45] text-white">
                    <CardHeader>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                      <CardDescription className="text-gray-400">
                        Add between 1 and 5 FAQs for your campaign
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {faqs.map((faq, index) => (
                        <div key={faq.id} className="space-y-4 p-4 border border-[#2e2f45] rounded-md relative">
                          <div className="absolute top-2 right-2">
                            {faqs.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFaq(faq.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-400 hover:bg-transparent"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <FormLabel htmlFor={`question-${faq.id}`}>
                              Question {index + 1}
                              <span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <Input
                              id={`question-${faq.id}`}
                              value={faq.question}
                              onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                              placeholder="Enter question"
                              className={cn(
                                "bg-[#0a0b14] border-[#2e2f45] text-white",
                                faqErrors && faqErrors[faq.id]?.question && "border-red-500"
                              )}
                            />
                            {faqErrors && faqErrors[faq.id]?.question && (
                              <p className="text-sm font-medium text-red-500">
                                {faqErrors[faq.id].question}
                              </p>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <FormLabel htmlFor={`answer-${faq.id}`}>
                              Answer
                              <span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <Textarea
                              id={`answer-${faq.id}`}
                              value={faq.answer}
                              onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                              placeholder="Enter answer"
                              className={cn(
                                "bg-[#0a0b14] border-[#2e2f45] text-white min-h-[100px]",
                                faqErrors && faqErrors[faq.id]?.answer && "border-red-500"
                              )}
                            />
                            {faqErrors && faqErrors[faq.id]?.answer && (
                              <p className="text-sm font-medium text-red-500">
                                {faqErrors[faq.id].answer}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-4">
                      {faqs.length < 5 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addFaq}
                          className="bg-[#1a1b2e] border-[#2e2f45] hover:bg-[#2e2f45]"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Another FAQ ({faqs.length}/5)
                        </Button>
                      )}
                      
                      <Alert variant="default" className="bg-blue-900/20 border-blue-800 text-white">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>FAQ Requirements</AlertTitle>
                        <AlertDescription>
                          You must add at least 1 FAQ and can add up to 5 FAQs. Each FAQ must have both a question and an answer.
                        </AlertDescription>
                      </Alert>
                    </CardFooter>
                  </Card>

                  <Card className="bg-blue-900/30 border-blue-800 text-white">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-2">Funding Information</h3>
                      <p className="text-sm text-gray-300">
                        Your campaign will be reviewed by our team before it goes live. Once approved, investors will be able to contribute to your project until the funding deadline.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}

            <div className="flex justify-between pt-4">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-[#1a1b2e] border-[#2e2f45] hover:bg-[#2e2f45]"
                >
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentStep === 3 ? "Create Campaign" : "Next"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
"use client";

import type React from "react";

import { useState } from "react";
import { FileText, Grid, Heart, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ThankYouPage } from "@/components/thank-you-page";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  linkedIn: string;
  visaCategory: string;
  additionalInfo: string;
  resume: File | null;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

export function FormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    linkedIn: "",
    visaCategory: "",
    additionalInfo: "",
    resume: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, resume: e.target.files![0] }));
      setErrors((prev) => ({ ...prev, resume: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.linkedIn) newErrors.linkedIn = "LinkedIn profile is required";
    if (!formData.visaCategory)
      newErrors.visaCategory = "Visa category is required";
    if (!formData.resume) newErrors.resume = "Resume is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      toast({
        title: "Form Submitted",
        description: "Thank you for your submission. We'll be in touch soon!",
      });
    } else {
      toast({
        title: "Form Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return <ThankYouPage homeClick={() => setSubmitted(false)} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#DCE2A5] relative h-[300px] md:h-[320px] overflow-hidden">
        <div className="absolute left-0 top-0 h-full">
          <div className="relative h-full">
            <div
              className="w-[200px] h-[200px] rounded-full bg-[#D5DB9E] absolute shadow-lg"
              style={{
                left: "-30px",
                bottom: "-10px",
              }}
            ></div>
            <div
              className="w-[150px] h-[150px] rounded-full bg-[#CDD596] absolute shadow-lg"
              style={{
                left: "30px",
                bottom: "140px",
              }}
            ></div>
            <div className="w-[100px] h-[100px] rounded-full bg-[#C5CE8E] absolute shadow-lg"></div>
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-[600px] mx-auto px-4">
            <p className="text-base font-medium mb-4">almā</p>
            <h1 className="text-3xl md:text-[2.75rem] lg:text-5xl font-bold">
              Get An Assessment
              <br />
              Of Your Immigration Case
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-12">
          <div className="bg-[#e8ebff] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-6 h-6 text-[#6b7aff]" />
          </div>
          <h2 className="text-2xl font-bold mb-4">
            Want to understand your visa options?
          </h2>
          <p className="text-gray-600">
            Submit the form below and our team of experienced attorneys will
            review your information and send a preliminary assessment of your
            case based on your goals.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          <div className="space-y-4">
            <div>
              <Input
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <Select
                name="country"
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, country: value }))
                }
              >
                <SelectTrigger
                  className={errors.country ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Country of Citizenship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="mx">Mexico</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  {/* Add more countries */}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>
            <div>
              <Input
                placeholder="LinkedIn / Personal Website URL"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleInputChange}
                className={errors.linkedIn ? "border-red-500" : ""}
              />
              {errors.linkedIn && (
                <p className="text-red-500 text-sm mt-1">{errors.linkedIn}</p>
              )}
            </div>
          </div>

          <div className="pt-8">
            <div className="text-center mb-6">
              <div className="bg-[#e8ebff] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Grid className="w-6 h-6 text-[#6b7aff]" />
              </div>
              <h3 className="text-xl font-bold">
                Visa categories of interest?
              </h3>
            </div>

            <RadioGroup
              name="visaCategory"
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, visaCategory: value }))
              }
              className={
                errors.visaCategory
                  ? "border border-red-500 rounded-md p-2"
                  : ""
              }
            >
              {["O-1", "EB-1A", "EB-2 NIW", "I don't know"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.toLowerCase().replace(/\s+/g, "")}
                    id={option.toLowerCase().replace(/\s+/g, "")}
                  />
                  <Label htmlFor={option.toLowerCase().replace(/\s+/g, "")}>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.visaCategory && (
              <p className="text-red-500 text-sm mt-1">{errors.visaCategory}</p>
            )}
          </div>

          {/* Additional Information Section */}
          <div className="pt-8">
            <div className="text-center mb-6">
              <div className="bg-[#e8ebff] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-[#6b7aff]" />
              </div>
              <h3 className="text-xl font-bold">How can we help you?</h3>
            </div>

            <Textarea
              placeholder="What is your goal? Immigration history? Are you looking to start from scratch? Anything else we should know about your case and potential considerations?"
              className="min-h-[120px]"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            />
          </div>

          {/* File Upload Section */}
          <div className="pt-8">
            <div className="text-center mb-6">
              <div className="bg-[#e8ebff] w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-6 h-6 text-[#6b7aff]" />
              </div>
              <h3 className="text-xl font-bold">Upload your Resume/CV</h3>
            </div>

            <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="resume"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                  errors.resume ? "border-red-500" : ""
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX (MAX. 10MB)
                  </p>
                </div>
                <Input
                  id="resume"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </Label>
            </div>
            {formData.resume && (
              <p className="text-sm text-gray-500 mt-2">
                File selected: {formData.resume.name}
              </p>
            )}
            {errors.resume && (
              <p className="text-red-500 text-sm mt-1">{errors.resume}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-zinc-900 hover:bg-zinc-800"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

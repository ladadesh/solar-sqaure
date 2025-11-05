import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  CheckCircle,
  Loader,
} from "lucide-react";

interface FormData {
  // This should be your deployed Google Apps Script Web App URL
  // It's best to move this to a .env file in a real project
  SCRIPT_URL: string;

  kamName: string;
  kamEmail: string;
  partnerName: string;
  partnerEmail: string;
  partnerMobile: string;
  partnerAddress: string;
  city: string;
  state: string;
  profession: string;
  businessProfile: string;
  footFall: string;
  aadhaar: string;
  pan: string;
  account: string;
  account2: string;
  ifsc: string;
  bankName: string;
  remarks: string;
}

interface Files {
  aadhaarFront: File | null;
  aadhaarBack: File | null;
  panFront: File | null;
  bankProof: File | null;
}

interface CityLookup {
  [key: string]: string;
}

const SolarProOnboarding: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isProfessionInput, setIsProfessionInput] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    SCRIPT_URL:
      "https://script.google.com/macros/s/AKfycbz7mc6SgEnsl_v0Vd6Y9u7RDlLXGFLrEaG-sdw31wL_2aKsYE0X7K0PgWsZ8-eM7HMx/exec", // <-- IMPORTANT: PASTE YOUR URL HERE
    kamName: "",
    kamEmail: "",
    partnerName: "",
    partnerEmail: "",
    partnerMobile: "",
    partnerAddress: "",
    city: "",
    state: "",
    profession: "",
    businessProfile: "",
    footFall: "",
    aadhaar: "",
    pan: "",
    account: "",
    account2: "",
    ifsc: "",
    bankName: "",
    remarks: "",
  });

  const [files, setFiles] = useState<Files>({
    aadhaarFront: null,
    aadhaarBack: null,
    panFront: null,
    bankProof: null,
  });

  const cityLookup: CityLookup = {
    // Maharashtra
    mumbai: "Maharashtra",
    pune: "Maharashtra",
    nagpur: "Maharashtra",
    nashik: "Maharashtra",
    aurangabad: "Maharashtra",
    solapur: "Maharashtra",
    kolhapur: "Maharashtra",
    amravati: "Maharashtra",
    akola: "Maharashtra",
    sangli: "Maharashtra",
    latur: "Maharashtra",
    satara: "Maharashtra",
    ratnagiri: "Maharashtra",
    jalgaon: "Maharashtra",
    chandrapur: "Maharashtra",
    beed: "Maharashtra",
    parbhani: "Maharashtra",
    nanded: "Maharashtra",
    wardha: "Maharashtra",
    gondia: "Maharashtra",
    hingoli: "Maharashtra",

    // Gujarat
    ahmedabad: "Gujarat",
    surat: "Gujarat",
    vadodara: "Gujarat",
    rajkot: "Gujarat",
    bhavnagar: "Gujarat",
    jamnagar: "Gujarat",
    gandhinagar: "Gujarat",
    anand: "Gujarat",
    nadiad: "Gujarat",
    vapi: "Gujarat",
    navsari: "Gujarat",
    valsad: "Gujarat",
    mehsana: "Gujarat",
    morbi: "Gujarat",
    junagadh: "Gujarat",
    patan: "Gujarat",
    bharuch: "Gujarat",
    dahod: "Gujarat",
    godhra: "Gujarat",

    // Uttar Pradesh
    lucknow: "Uttar Pradesh",
    kanpur: "Uttar Pradesh",
    varanasi: "Uttar Pradesh",
    agra: "Uttar Pradesh",
    meerut: "Uttar Pradesh",
    prayagraj: "Uttar Pradesh",
    ghaziabad: "Uttar Pradesh",
    noida: "Uttar Pradesh",
    bareilly: "Uttar Pradesh",
    aligarh: "Uttar Pradesh",
    moradabad: "Uttar Pradesh",
    saharanpur: "Uttar Pradesh",
    jhansi: "Uttar Pradesh",
    gorakhpur: "Uttar Pradesh",
    faizabad: "Uttar Pradesh",
    mathura: "Uttar Pradesh",
    muzaffarnagar: "Uttar Pradesh",
    ayodhya: "Uttar Pradesh",
    etawah: "Uttar Pradesh",
    sitapur: "Uttar Pradesh",
    banda: "Uttar Pradesh",
    sultanpur: "Uttar Pradesh",

    // Madhya Pradesh
    bhopal: "Madhya Pradesh",
    indore: "Madhya Pradesh",
    gwalior: "Madhya Pradesh",
    jabalpur: "Madhya Pradesh",
    ujjain: "Madhya Pradesh",
    sagar: "Madhya Pradesh",
    rewa: "Madhya Pradesh",
    satna: "Madhya Pradesh",
    khargone: "Madhya Pradesh",
    ratlam: "Madhya Pradesh",
    neemuch: "Madhya Pradesh",
    shivpuri: "Madhya Pradesh",
    vidisha: "Madhya Pradesh",
    chhindwara: "Madhya Pradesh",
    betul: "Madhya Pradesh",
    khandwa: "Madhya Pradesh",
    damoh: "Madhya Pradesh",

    // Delhi & NCR
    delhi: "Delhi",
    new_delhi: "Delhi",
    gurgaon: "Haryana",
    faridabad: "Haryana",
    sonipat: "Haryana",
    panipat: "Haryana",

    // Karnataka
    bangalore: "Karnataka",
    mysore: "Karnataka",
    mangalore: "Karnataka",
    hubli: "Karnataka",
    dharwad: "Karnataka",
    belgaum: "Karnataka",
    tumkur: "Karnataka",
    davangere: "Karnataka",
    shimoga: "Karnataka",
    bidar: "Karnataka",
    hospet: "Karnataka",
    chikmagalur: "Karnataka",

    // Telangana
    hyderabad: "Telangana",
    warangal: "Telangana",
    nizamabad: "Telangana",
    karimnagar: "Telangana",
    khammam: "Telangana",
    mahbubnagar: "Telangana",
    suryapet: "Telangana",
    siddipet: "Telangana",
    mancherial: "Telangana",

    // Tamil Nadu
    chennai: "Tamil Nadu",
    coimbatore: "Tamil Nadu",
    madurai: "Tamil Nadu",
    trichy: "Tamil Nadu",
    salem: "Tamil Nadu",
    vellore: "Tamil Nadu",
    tirunelveli: "Tamil Nadu",
    thanjavur: "Tamil Nadu",
    erode: "Tamil Nadu",
    nagercoil: "Tamil Nadu",
    tuticorin: "Tamil Nadu",

    // West Bengal
    kolkata: "West Bengal",
    asansol: "West Bengal",
    siliguri: "West Bengal",
    durgapur: "West Bengal",
    howrah: "West Bengal",
    haldia: "West Bengal",
    berhampore: "West Bengal",
    malda: "West Bengal",
    jalpaiguri: "West Bengal",

    // Rajasthan
    jaipur: "Rajasthan",
    jodhpur: "Rajasthan",
    udaipur: "Rajasthan",
    ajmer: "Rajasthan",
    kota: "Rajasthan",
    bharatpur: "Rajasthan",
    bikaner: "Rajasthan",
    alwar: "Rajasthan",
    sikar: "Rajasthan",
    pali: "Rajasthan",

    // Bihar
    patna: "Bihar",
    gaya: "Bihar",
    muzaffarpur: "Bihar",
    bhagalpur: "Bihar",
    darbhanga: "Bihar",
    purnia: "Bihar",
    arrah: "Bihar",
    begusarai: "Bihar",
    katihar: "Bihar",

    // Punjab
    ludhiana: "Punjab",
    amritsar: "Punjab",
    jalandhar: "Punjab",
    patiala: "Punjab",
    bathinda: "Punjab",
    hoshiarpur: "Punjab",
    mohali: "Punjab",
    pathankot: "Punjab",

    // Kerala
    kochi: "Kerala",
    trivandrum: "Kerala",
    kollam: "Kerala",
    kottayam: "Kerala",
    thrissur: "Kerala",
    calicut: "Kerala",
    palakkad: "Kerala",
    kannur: "Kerala",

    // Odisha
    bhubaneswar: "Odisha",
    cuttack: "Odisha",
    rourkela: "Odisha",
    sambalpur: "Odisha",
    balasore: "Odisha",
    berhampur: "Odisha",
    baripada: "Odisha",

    // Jharkhand
    ranchi: "Jharkhand",
    jamshedpur: "Jharkhand",
    dhanbad: "Jharkhand",
    bokaro: "Jharkhand",
    deoghar: "Jharkhand",
    giridih: "Jharkhand",
    hazaribagh: "Jharkhand",

    // Chhattisgarh
    raipur: "Chhattisgarh",
    bilaspur: "Chhattisgarh",
    durg: "Chhattisgarh",
    bhilai: "Chhattisgarh",
    korba: "Chhattisgarh",
    rajnandgaon: "Chhattisgarh",

    // Assam & North East
    guwahati: "Assam",
    dibrugarh: "Assam",
    silchar: "Assam",
    tezpur: "Assam",
    imphal: "Manipur",
    aizawl: "Mizoram",
    shillong: "Meghalaya",
    itanagar: "Arunachal Pradesh",
    agartala: "Tripura",
    kohima: "Nagaland",

    // Goa
    panaji: "Goa",
    margao: "Goa",
    mapusa: "Goa",

    // Himachal Pradesh
    shimla: "Himachal Pradesh",
    solan: "Himachal Pradesh",
    mandi: "Himachal Pradesh",
    dharamshala: "Himachal Pradesh",

    // Uttarakhand
    dehradun: "Uttarakhand",
    haridwar: "Uttarakhand",
    haldwani: "Uttarakhand",
    roorkee: "Uttarakhand",
  };

  const professionOptions: string[] = [
    "-- select --",
    "AC / RO Services",
    "Builder / Civil contractor / Real estate",
    "CCTV service provider",
    "DTH / Cable operator",
    "Electric / Hardware Contractor Shops",
    "Freelancer",
    "Battery - Dealers / Suppliers",
    "Retired / Salaried Individual",
    "EV - Car / Bike Showroom / Dealers",
    "Electricity Billing Counters",
    "Electronic Consumer Shops",
    "Other business",
  ];

  const businessProfileOptions: string[] = [
    "-- select --",
    "High",
    "Low",
    "Very High",
  ];
  const footfallOptions: string[] = [
    "-- select --",
    "0–20",
    "20–40",
    "40–60",
    "60+",
  ];
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "city") {
      const cityLower = value.trim().toLowerCase();
      const state = cityLookup[cityLower] || "";
      setFormData((prev) => ({ ...prev, state }));
    }

    if (name === "profession" && value === "Other business") {
      setIsProfessionInput(true);
      setFormData((prev) => ({ ...prev, profession: "" })); // Clear profession when switching
    } else if (name === "profession" && isProfessionInput && value === "") {
      setIsProfessionInput(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const validatePage1 = (): boolean => {
    const required: (keyof FormData)[] = [
      "kamName",
      "kamEmail",
      "partnerName",
      "partnerMobile",
      "partnerAddress",
      "city",
    ];
    for (let field of required) {
      if (!formData[field]?.trim()) {
        alert(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }
    return true;
  };

  const validatePage2 = (): boolean => {
    const required: (keyof FormData)[] = [
      "aadhaar",
      "pan",
      "account",
      "account2",
      "ifsc",
      "bankName",
    ];
    for (let field of required) {
      if (!formData[field]?.trim()) {
        alert(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }

    if (formData.account !== formData.account2) {
      alert("Account numbers must match");
      return false;
    }

    const requiredFiles: (keyof Files)[] = [
      "aadhaarFront",
      "aadhaarBack",
      "panFront",
      "bankProof",
    ];
    for (let fileKey of requiredFiles) {
      if (!files[fileKey]) {
        alert(
          `Please upload ${fileKey.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }

    return true;
  };

  const handleNext = async (): Promise<void> => {
    if (page === 1) {
      if (validatePage1()) {
        setPage(2);
      }
    } else {
      if (validatePage2()) {
        await handleSubmit();
      }
    }
  };

  const handlePrevious = (): void => {
    setPage(1);
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);

    // Helper function to call Google Apps Script
    const gasp = async (
      func: string,
      args: Record<string, any> = {}
    ): Promise<any> => {
      const res = await fetch(formData.SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ function: func, ...args }),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    };

    if (
      !formData.SCRIPT_URL ||
      formData.SCRIPT_URL.includes("YOUR_DEPLOYED_SCRIPT_URL")
    ) {
      alert(
        "Please set your Google Apps Script URL in the SCRIPT_URL constant."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Create a folder in Google Drive
      setUploadStatus("Creating submission folder...");
      setUploadProgress(10);
      const folderRes = await gasp("createFolderForSubmission", {
        partnerName: formData.partnerName,
        city: formData.city,
      });
      if (!folderRes.success)
        throw new Error(`Folder creation failed: ${folderRes.error}`);
      const { folderId, folderUrl } = folderRes;
      setUploadProgress(25);

      // 1.5 Get OAuth Token for file uploads
      setUploadStatus("Authenticating for file upload...");
      const tokenRes = await gasp("getOAuthToken");
      if (!tokenRes.success) throw new Error("Could not get auth token.");
      const { token } = tokenRes;

      // 2. Upload files to the created folder
      const fileMap: { [key: string]: string } = { folderUrl };
      const filesToUpload = Object.entries(files).filter(([, file]) => file);

      for (let i = 0; i < filesToUpload.length; i++) {
        const [key, file] = filesToUpload[i];
        if (!file) continue;

        setUploadStatus(
          `Uploading ${key}... (${i + 1}/${filesToUpload.length})`
        );

        const uploadUrlRes = await fetch(
          `https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable`,
          {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }),
            body: JSON.stringify({ name: file.name, parents: [folderId] }),
          }
        );
        if (!uploadUrlRes.ok)
          throw new Error(`Failed to get upload URL for ${file.name}`);
        const location = uploadUrlRes.headers.get("Location");
        if (!location)
          throw new Error(`Missing upload location for ${file.name}`);

        const uploadRes = await fetch(location, {
          method: "PUT",
          headers: new Headers({ "Content-Length": String(file.size) }),
          body: file,
        });

        if (!uploadRes.ok) throw new Error(`Upload failed for ${file.name}`);
        const uploadedFile = await uploadRes.json();
        fileMap[key] =
          uploadedFile.webViewLink ||
          `https://drive.google.com/file/d/${uploadedFile.id}/view`;

        setUploadProgress(25 + ((i + 1) / filesToUpload.length) * 50);
      }

      // 3. Finalize submission (write to sheet, send email)
      setUploadStatus("Finalizing submission...");
      setUploadProgress(90);
      const finalRes = await gasp("finalizeSubmission", {
        ...formData,
        fileMap,
      });
      if (!finalRes.success)
        throw new Error(`Finalization failed: ${finalRes.error}`);

      setUploadProgress(100);
      setIsSubmitting(false);
      setShowSuccess(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      alert("Submission failed: " + errorMessage);
      setIsSubmitting(false);
      setUploadProgress(0);
      setUploadStatus("");
    }
  };

  const resetForm = (): void => {
    const scriptUrl = formData.SCRIPT_URL; // Preserve script URL
    setFormData({
      SCRIPT_URL: scriptUrl,
      kamName: "",
      kamEmail: "",
      partnerName: "",
      partnerEmail: "",
      partnerMobile: "",
      partnerAddress: "",
      city: "",
      state: "",
      profession: "",
      businessProfile: "",
      footFall: "",
      aadhaar: "",
      pan: "",
      account: "",
      account2: "",
      ifsc: "",
      bankName: "",
      remarks: "",
    });
    setFiles({
      aadhaarFront: null,
      aadhaarBack: null,
      panFront: null,
      bankProof: null,
    });
    setPage(1);
    setShowSuccess(false);
    setUploadProgress(0);
    setUploadStatus("");
  };

  const progressPercent: number = page === 1 ? 0 : 100;

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header
        className="text-white shadow-md"
        style={{
          background:
            "linear-gradient(90.16deg,#101f9d -15.84%,#11111c 122.54%)",
        }}
      >
        <div className="px-4 py-2.5 flex items-center gap-3">
          <div className="font-bold rounded-full h-8 w-8 flex items-center justify-center text-sm flex-shrink-0">
            <img
              loading="lazy"
              className="brand-logo"
              src="https://sse-website.s3.ap-south-1.amazonaws.com/brands/brand-logo-white.svg"
              alt="SolarSquare"
            ></img>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm sm:text-base truncate">
              SolarPro Partner Onboarding
            </div>
            <div className="text-xs opacity-95 hidden sm:block">
              Mobile-first — fill quickly on phone
            </div>
          </div>
          <div className="text-xs opacity-95 flex-shrink-0">Secure</div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-3 sm:p-4 flex-1 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm w-full max-w-2xl mx-auto">
          <div className="p-4 sm:p-5">
            {/* Progress Header */}
            <div className="mb-3 sm:mb-4">
              <div className="flex justify-between items-start mb-2 sm:mb-3">
                <div className="flex-1 min-w-0 pr-2">
                  <div className="font-bold text-base sm:text-lg truncate">
                    Page {page} —{" "}
                    {page === 1 ? "KAM & Partner" : "Documents & Bank"}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    {page === 1
                      ? "Who is submitting & partner basics"
                      : "Upload documents & bank details"}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs sm:text-sm text-gray-600">
                    Page {page} of 2
                  </div>
                  <div className="font-bold text-sm sm:text-base">
                    {progressPercent}%
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-blue-100 h-1.5 sm:h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Page 1 */}
            {page === 1 && (
              <div className="space-y-3 sm:space-y-3.5">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    KAM / SC / Source Name *
                  </label>
                  <input
                    type="text"
                    name="kamName"
                    value={formData.kamName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    KAM Email *
                  </label>
                  <input
                    type="email"
                    name="kamEmail"
                    value={formData.kamEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    Partner Name *
                  </label>
                  <input
                    type="text"
                    name="partnerName"
                    value={formData.partnerName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    Partner Email
                  </label>
                  <input
                    type="email"
                    name="partnerEmail"
                    value={formData.partnerEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    Partner Address (with Pincode) *
                  </label>
                  <textarea
                    name="partnerAddress"
                    value={formData.partnerAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      Partner Mobile *
                    </label>
                    <input
                      type="tel"
                      name="partnerMobile"
                      value={formData.partnerMobile}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      inputMode="tel"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      Profession / Profile
                    </label>
                    {isProfessionInput ? (
                      <input
                        type="text"
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        placeholder="Enter your profession"
                        className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <select
                        name="profession"
                        value={formData.profession}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {professionOptions.map((opt) => (
                          <option
                            key={opt}
                            value={opt === "-- select --" ? "" : opt}
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Type city..."
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      readOnly
                      placeholder="Auto-filled"
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base bg-gray-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      Business Potential
                    </label>
                    <select
                      name="businessProfile"
                      value={formData.businessProfile}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {businessProfileOptions.map((opt) => (
                        <option
                          key={opt}
                          value={opt === "-- select --" ? "" : opt}
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      Foot Fall
                    </label>
                    <select
                      name="footFall"
                      value={formData.footFall}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {footfallOptions.map((opt) => (
                        <option
                          key={opt}
                          value={opt === "-- select --" ? "" : opt}
                        >
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Page 2 */}
            {page === 2 && (
              <div className="space-y-3 sm:space-y-3.5">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    Aadhaar Number *
                  </label>
                  <input
                    type="text"
                    name="aadhaar"
                    value={formData.aadhaar}
                    onChange={handleInputChange}
                    placeholder="1111 2222 3333"
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    inputMode="numeric"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    PAN Number *
                  </label>
                  <input
                    type="text"
                    name="pan"
                    value={formData.pan}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      Account Number *
                    </label>
                    <input
                      type="text"
                      name="account"
                      value={formData.account}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      Re-enter Account *
                    </label>
                    <input
                      type="text"
                      name="account2"
                      value={formData.account2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      IFSC Code *
                    </label>
                    <input
                      type="text"
                      name="ifsc"
                      value={formData.ifsc}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium mb-1">
                      Bank Name *
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    Upload Aadhaar Front *
                  </label>
                  <input
                    type="file"
                    name="aadhaarFront"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {files.aadhaarFront && (
                    <div className="text-xs text-green-600 mt-1 truncate">
                      ✓ {files.aadhaarFront.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    Upload Aadhaar Back *
                  </label>
                  <input
                    type="file"
                    name="aadhaarBack"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {files.aadhaarBack && (
                    <div className="text-xs text-green-600 mt-1 truncate">
                      ✓ {files.aadhaarBack.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    Upload PAN Card *
                  </label>
                  <input
                    type="file"
                    name="panFront"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {files.panFront && (
                    <div className="text-xs text-green-600 mt-1 truncate">
                      ✓ {files.panFront.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    Upload Cancelled Cheque / Passbook *
                  </label>
                  <input
                    type="file"
                    name="bankProof"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {files.bankProof && (
                    <div className="text-xs text-green-600 mt-1 truncate">
                      ✓ {files.bankProof.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">
                    Remarks
                  </label>
                  <textarea
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                    placeholder="Optional"
                    className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-4 sm:mt-5 gap-2 sm:gap-3">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-lg font-medium text-sm sm:text-base ${
                  page === 1
                    ? "invisible"
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <div className="flex gap-1.5">
                {[1, 2].map((p) => (
                  <div
                    key={p}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      p === page ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={isSubmitting}
                className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-blue-700 disabled:opacity-60"
              >
                {page === 1 ? (
                  <>
                    Next
                    <ChevronRight size={18} />
                  </>
                ) : (
                  <>
                    Submit
                    <Upload size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Upload Progress Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-5 sm:p-6 max-w-md w-full text-center">
            <Loader
              className="animate-spin text-blue-600 mx-auto mb-3 sm:mb-4"
              size={40}
            />
            <h3 className="text-lg sm:text-xl font-bold mb-2">Submitting...</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
              {uploadStatus}
            </p>
            <div className="bg-blue-100 h-1.5 sm:h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-2">
              {uploadProgress}%
            </div>
          </div>
        </div>
      )}

      {/* Success Screen */}
      {showSuccess && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-md w-full text-center shadow-lg">
            <CheckCircle
              className="text-green-600 mx-auto mb-3 sm:mb-4"
              size={56}
            />
            <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
              Thank You!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
              Your onboarding request has been submitted successfully.
            </p>
            <button
              onClick={resetForm}
              className="px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-50 text-blue-600 rounded-lg font-medium text-sm sm:text-base hover:bg-blue-100"
            >
              Fill Another Form
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolarProOnboarding;

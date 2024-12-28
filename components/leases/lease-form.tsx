"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Selectui,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { SelectSearch } from "@/components/ui/select-search";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";

console.log("LeaseForm component rendered");

const leaseSchema = z.object({
  propertyId: z.string().min(1, "Property is required"),
  unitId: z.string().min(1, "Unit is required"),
  tenantIds: z.array(z.string()).min(1, "At least one tenant is required"),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End date is required" }),
  rentAmount: z.number().min(0.01, "Rent amount is required and must be greater than 0"),
  depositAmount: z.number().min(0.01, "Deposit amount is required and must be greater than 0"),
  type: z.enum(["FIXED", "MONTH_TO_MONTH", "FLEXIBLE"]),
  terms: z.string().optional(),
});

console.log("Form initialized with schema:", leaseSchema);

type LeaseFormValues = z.infer<typeof leaseSchema>;

interface Unit {
  id: string;
  unitNumber: string;
  property: {
    name: string;
  };
}

interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
}

interface SelectChangeEvent {
  value: string;
}

interface Property {
  id: string;
  name: string;
  units: {
    id: string;
    unitNumber: string;
  }[];
  type: string;
  status: string;
  organizationId: string;
}

interface TenantOption {
  label: string;
  value: string;
}

interface LeaseFormProps {
  initialData?: any;
  isEditing?: boolean;
  onSuccess?: () => void;
}

export function LeaseForm({ initialData, isEditing, onSuccess }: LeaseFormProps) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [tenantSearch, setTenantSearch] = useState("");
  const router = useRouter();

  const form = useForm<LeaseFormValues>({
    resolver: zodResolver(leaseSchema),
    defaultValues: initialData ? {
      propertyId: initialData.unit.property.id,
      unitId: initialData.unit.id,
      tenantIds: initialData.tenants.map((t: any) => t.id),
      startDate: parseISO(initialData.startDate),
      endDate: parseISO(initialData.endDate),
      rentAmount: initialData.rentAmount,
      depositAmount: initialData.depositAmount,
      type: initialData.type,
      terms: initialData.terms || "",
    } : {
      propertyId: "",
      unitId: "",
      tenantIds: [],
      type: "FIXED",
      rentAmount: 0,
      depositAmount: 0,
      startDate: undefined,
      endDate: undefined,
      terms: "",
    },
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties?include=units');
        if (!response.ok) throw new Error();
        const data = await response.json();
        console.log("Fetched properties:", data);
        
        // Transform the data to ensure units are included
        const propertiesWithUnits = data.map((property: any) => ({
          ...property,
          units: property.units || [] // Ensure units array exists
        }));
        
        setProperties(propertiesWithUnits);
        
        if (initialData) {
          const property = propertiesWithUnits.find((p: Property) => p.id === initialData.unit.property.id);
          console.log("Setting initial property:", property);
          setSelectedProperty(property || null);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties");
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await fetch('/api/tenants');
        if (!response.ok) throw new Error();
        const data = await response.json();
        setTenants(data);
      } catch (error) {
        toast.error("Failed to load tenants");
      }
    };

    fetchTenants();
  }, []);

  useEffect(() => {
    if (initialData && properties.length > 0) {
      const property = properties.find(p => p.id === initialData.unit.property.id);
      if (property) {
        setSelectedProperty(property);
        form.setValue('propertyId', property.id);
        form.setValue('unitId', initialData.unit.id);
      }
    }
  }, [initialData, properties, form]);

  const handlePropertyChange = (propertyId: string) => {
    console.log("Property changed to:", propertyId);
    const property = properties.find(p => p.id === propertyId);
    console.log("Found property:", property);
    console.log("Property units:", property?.units);
    setSelectedProperty(property || null);
    form.setValue('unitId', '');
  };

  const onSubmit = async (data: LeaseFormValues) => {
    try {
      setIsLoading(true);
      
      const formattedData = {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        rentAmount: Number(data.rentAmount),
        depositAmount: Number(data.depositAmount),
      };
      
      console.log("Submitting lease data:", formattedData);
      
      const response = await fetch("/api/leases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (responseData.error === 'Date range conflicts with existing leases') {
          toast.error("Cannot create lease: The selected dates conflict with an existing lease for this unit. Please choose different dates.", {
            duration: 5000,
          });
        } else {
          toast.error(responseData.error || "Failed to create lease", {
            duration: 5000,
          });
        }
        return;
      }
      
      toast.success("Lease created successfully");
      
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/leases");
      }
      
    } catch (error) {
      console.error("Error details:", error);
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred", {
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const tenantOptions: TenantOption[] = tenants.map(tenant => ({
    label: `${tenant.firstName} ${tenant.lastName}`,
    value: tenant.id
  }));

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form 
          onSubmit={async (e) => {
            e.preventDefault();
            console.log("Form submitted");
            
            // Check form validity
            const isValid = await form.trigger();
            console.log("Form validation result:", isValid);
            
            if (!isValid) {
              const errors = form.formState.errors;
              console.log("Form errors:", errors);
              
              // Create error message
              const errorMessages = Object.entries(errors)
                .map(([field, error]) => `${field}: ${error.message}`)
                .join('\n');
              
              toast.error(
                <div>
                  <p>Please fix the following errors:</p>
                  <pre className="mt-2 text-sm">{errorMessages}</pre>
                </div>
              );
              return;
            }
            
            form.handleSubmit(onSubmit)(e);
          }} 
          className="space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="propertyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property <span className="text-red-500">*</span></FormLabel>
                  <Selectui
                    onValueChange={(value) => {
                      field.onChange(value);
                      handlePropertyChange(value);
                    }}
                    defaultValue={initialData?.unit.property.id}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property">
                          {properties.find(p => p.id === field.value)?.name || "Select property"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          {property.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Selectui>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unitId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit <span className="text-red-500">*</span></FormLabel>
                  <Selectui
                    onValueChange={field.onChange}
                    defaultValue={initialData?.unit.id}
                    disabled={!form.watch('propertyId')}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit">
                          {selectedProperty?.units?.find(u => u.id === field.value)?.unitNumber || "Select unit"}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedProperty?.units?.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {unit.unitNumber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Selectui>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tenantIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tenants <span className="text-red-500">*</span></FormLabel>
                  <SelectSearch
                    options={tenantOptions}
                    isSearchable={true}
                    isClearable={true}
                    isMulti={true}
                    placeholder="Search for tenants..."
                    value={
                      field.value
                        ? tenantOptions.filter(option => 
                            field.value.includes(option.value)
                          )
                        : []
                    }
                    onChange={(options: any) => {
                      const values = options ? options.map((opt: TenantOption) => opt.value) : [];
                      field.onChange(values);
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Date fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date <span className="text-red-500">*</span></FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date <span className="text-red-500">*</span></FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[280px] p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Amount fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="rentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Amount <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="depositAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Amount <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lease Type <span className="text-red-500">*</span></FormLabel>
                <Selectui 
                  onValueChange={field.onChange} 
                  defaultValue={initialData?.type}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lease type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FIXED">Fixed Term</SelectItem>
                    <SelectItem value="MONTH_TO_MONTH">Month to Month</SelectItem>
                    <SelectItem value="FLEXIBLE">Flexible</SelectItem>
                  </SelectContent>
                </Selectui>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Terms</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              isEditing ? "Saving..." : "Creating..."
            ) : (
              isEditing ? "Save Lease" : "Create Lease"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
} 
--
-- PostgreSQL database dump
--

-- Dumped from database version 14.15 (Homebrew)
-- Dumped by pg_dump version 14.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DocumentType; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."DocumentType" AS ENUM (
    'LEASE',
    'INVOICE',
    'MAINTENANCE',
    'INSPECTION',
    'INSURANCE',
    'LEGAL',
    'OTHER'
);


ALTER TYPE public."DocumentType" OWNER TO superadmin;

--
-- Name: InspectionType; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."InspectionType" AS ENUM (
    'MOVE_IN',
    'MOVE_OUT',
    'ROUTINE',
    'MAINTENANCE'
);


ALTER TYPE public."InspectionType" OWNER TO superadmin;

--
-- Name: InsuranceType; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."InsuranceType" AS ENUM (
    'PROPERTY',
    'LIABILITY',
    'WORKERS_COMP',
    'PROFESSIONAL'
);


ALTER TYPE public."InsuranceType" OWNER TO superadmin;

--
-- Name: LeaseStatus; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."LeaseStatus" AS ENUM (
    'ACTIVE',
    'EXPIRED',
    'TERMINATED',
    'PENDING'
);


ALTER TYPE public."LeaseStatus" OWNER TO superadmin;

--
-- Name: LeaseType; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."LeaseType" AS ENUM (
    'FIXED',
    'MONTH_TO_MONTH',
    'FLEXIBLE'
);


ALTER TYPE public."LeaseType" OWNER TO superadmin;

--
-- Name: MaintenanceCategory; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."MaintenanceCategory" AS ENUM (
    'PLUMBING',
    'ELECTRICAL',
    'HVAC',
    'APPLIANCE',
    'STRUCTURAL',
    'GENERAL'
);


ALTER TYPE public."MaintenanceCategory" OWNER TO superadmin;

--
-- Name: MaintenanceStatus; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."MaintenanceStatus" AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'COMPLETED',
    'CANCELLED'
);


ALTER TYPE public."MaintenanceStatus" OWNER TO superadmin;

--
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."NotificationType" AS ENUM (
    'MAINTENANCE',
    'PAYMENT',
    'LEASE',
    'GENERAL'
);


ALTER TYPE public."NotificationType" OWNER TO superadmin;

--
-- Name: OrgType; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."OrgType" AS ENUM (
    'PROPERTY_MANAGER',
    'LANDLORD',
    'REAL_ESTATE_AGENT'
);


ALTER TYPE public."OrgType" OWNER TO superadmin;

--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'PAID',
    'OVERDUE',
    'CANCELLED'
);


ALTER TYPE public."PaymentStatus" OWNER TO superadmin;

--
-- Name: PaymentType; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."PaymentType" AS ENUM (
    'RENT',
    'DEPOSIT',
    'LATE_FEE',
    'MAINTENANCE',
    'UTILITY',
    'OTHER'
);


ALTER TYPE public."PaymentType" OWNER TO superadmin;

--
-- Name: Priority; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."Priority" AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'EMERGENCY'
);


ALTER TYPE public."Priority" OWNER TO superadmin;

--
-- Name: PropertyType; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."PropertyType" AS ENUM (
    'RESIDENTIAL',
    'COMMERCIAL',
    'MIXED'
);


ALTER TYPE public."PropertyType" OWNER TO superadmin;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."Status" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'PENDING',
    'COMPLETED'
);


ALTER TYPE public."Status" OWNER TO superadmin;

--
-- Name: SubStatus; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."SubStatus" AS ENUM (
    'ACTIVE',
    'CANCELLED',
    'EXPIRED',
    'PENDING'
);


ALTER TYPE public."SubStatus" OWNER TO superadmin;

--
-- Name: TenantStatus; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."TenantStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'EVICTED',
    'FORMER'
);


ALTER TYPE public."TenantStatus" OWNER TO superadmin;

--
-- Name: TransactionType; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."TransactionType" AS ENUM (
    'INCOME',
    'EXPENSE'
);


ALTER TYPE public."TransactionType" OWNER TO superadmin;

--
-- Name: UnitStatus; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."UnitStatus" AS ENUM (
    'VACANT',
    'OCCUPIED',
    'MAINTENANCE',
    'RESERVED'
);


ALTER TYPE public."UnitStatus" OWNER TO superadmin;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'MANAGER',
    'STAFF',
    'USER'
);


ALTER TYPE public."UserRole" OWNER TO superadmin;

--
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."UserStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'SUSPENDED'
);


ALTER TYPE public."UserStatus" OWNER TO superadmin;

--
-- Name: VendorType; Type: TYPE; Schema: public; Owner: superadmin
--

CREATE TYPE public."VendorType" AS ENUM (
    'MAINTENANCE',
    'CLEANING',
    'LANDSCAPING',
    'SECURITY',
    'OTHER'
);


ALTER TYPE public."VendorType" OWNER TO superadmin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Address" (
    id text NOT NULL,
    street text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    "zipCode" text NOT NULL,
    country text DEFAULT 'US'::text NOT NULL,
    "propertyId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Address" OWNER TO superadmin;

--
-- Name: Amenity; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Amenity" (
    id text NOT NULL,
    name text NOT NULL,
    category text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Amenity" OWNER TO superadmin;

--
-- Name: BackgroundCheck; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."BackgroundCheck" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    status public."Status" NOT NULL,
    "creditScore" integer,
    "criminalRecord" boolean NOT NULL,
    "evictionHistory" boolean NOT NULL,
    "verifiedIncome" double precision,
    "completedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."BackgroundCheck" OWNER TO superadmin;

--
-- Name: Budget; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Budget" (
    id text NOT NULL,
    "propertyId" text NOT NULL,
    year integer NOT NULL,
    month integer NOT NULL,
    category text NOT NULL,
    amount double precision NOT NULL,
    actual double precision DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Budget" OWNER TO superadmin;

--
-- Name: Document; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Document" (
    id text NOT NULL,
    title text NOT NULL,
    type public."DocumentType" NOT NULL,
    "fileUrl" text NOT NULL,
    "propertyId" text,
    "tenantId" text,
    "leaseId" text,
    "vendorId" text,
    "backgroundCheckId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "insuranceId" text
);


ALTER TABLE public."Document" OWNER TO superadmin;

--
-- Name: Inspection; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Inspection" (
    id text NOT NULL,
    "propertyId" text NOT NULL,
    "unitId" text,
    type public."InspectionType" NOT NULL,
    status public."Status" DEFAULT 'PENDING'::public."Status" NOT NULL,
    "scheduledDate" timestamp(3) without time zone NOT NULL,
    "completedDate" timestamp(3) without time zone,
    notes text,
    images text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Inspection" OWNER TO superadmin;

--
-- Name: Insurance; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Insurance" (
    id text NOT NULL,
    type public."InsuranceType" NOT NULL,
    provider text NOT NULL,
    "policyNumber" text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    coverage double precision NOT NULL,
    "propertyId" text,
    "vendorId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Insurance" OWNER TO superadmin;

--
-- Name: Lease; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Lease" (
    id text NOT NULL,
    "unitId" text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    "rentAmount" double precision NOT NULL,
    "depositAmount" double precision NOT NULL,
    status public."LeaseStatus" DEFAULT 'PENDING'::public."LeaseStatus" NOT NULL,
    type public."LeaseType" DEFAULT 'FIXED'::public."LeaseType" NOT NULL,
    terms text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Lease" OWNER TO superadmin;

--
-- Name: LeaseRenewal; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."LeaseRenewal" (
    id text NOT NULL,
    "leaseId" text NOT NULL,
    "newStartDate" timestamp(3) without time zone NOT NULL,
    "newEndDate" timestamp(3) without time zone NOT NULL,
    "newRentAmount" double precision NOT NULL,
    status public."Status" DEFAULT 'PENDING'::public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."LeaseRenewal" OWNER TO superadmin;

--
-- Name: MaintenanceRequest; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."MaintenanceRequest" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "unitId" text NOT NULL,
    "requestedById" text NOT NULL,
    priority public."Priority" DEFAULT 'MEDIUM'::public."Priority" NOT NULL,
    status public."MaintenanceStatus" DEFAULT 'OPEN'::public."MaintenanceStatus" NOT NULL,
    category public."MaintenanceCategory" NOT NULL,
    "vendorId" text,
    "scheduledDate" timestamp(3) without time zone,
    "completedDate" timestamp(3) without time zone,
    cost double precision,
    notes text,
    images text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."MaintenanceRequest" OWNER TO superadmin;

--
-- Name: Notification; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Notification" (
    id text NOT NULL,
    "userId" text NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    type public."NotificationType" NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Notification" OWNER TO superadmin;

--
-- Name: Organization; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Organization" (
    id text NOT NULL,
    name text NOT NULL,
    type public."OrgType" DEFAULT 'PROPERTY_MANAGER'::public."OrgType" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Organization" OWNER TO superadmin;

--
-- Name: Payment; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Payment" (
    id text NOT NULL,
    "tenantId" text NOT NULL,
    "leaseId" text NOT NULL,
    amount double precision NOT NULL,
    type public."PaymentType" NOT NULL,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "dueDate" timestamp(3) without time zone NOT NULL,
    "paidDate" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Payment" OWNER TO superadmin;

--
-- Name: Property; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Property" (
    id text NOT NULL,
    name text NOT NULL,
    type public."PropertyType" NOT NULL,
    status public."Status" DEFAULT 'ACTIVE'::public."Status" NOT NULL,
    "managerId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Property" OWNER TO superadmin;

--
-- Name: PropertyFinancial; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."PropertyFinancial" (
    id text NOT NULL,
    "propertyId" text NOT NULL,
    revenue double precision DEFAULT 0 NOT NULL,
    expenses double precision DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."PropertyFinancial" OWNER TO superadmin;

--
-- Name: Subscription; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Subscription" (
    id text NOT NULL,
    "organizationId" text NOT NULL,
    plan text NOT NULL,
    status public."SubStatus" DEFAULT 'ACTIVE'::public."SubStatus" NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Subscription" OWNER TO superadmin;

--
-- Name: Task; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Task" (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    "assignedToId" text NOT NULL,
    "propertyId" text NOT NULL,
    "dueDate" timestamp(3) without time zone,
    priority public."Priority" DEFAULT 'MEDIUM'::public."Priority" NOT NULL,
    status public."Status" DEFAULT 'PENDING'::public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Task" OWNER TO superadmin;

--
-- Name: Tenant; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Tenant" (
    id text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    email text NOT NULL,
    phone text,
    status public."TenantStatus" DEFAULT 'ACTIVE'::public."TenantStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Tenant" OWNER TO superadmin;

--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Transaction" (
    id text NOT NULL,
    "propertyId" text NOT NULL,
    "paymentId" text,
    amount double precision NOT NULL,
    type public."TransactionType" NOT NULL,
    category text NOT NULL,
    description text,
    date timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Transaction" OWNER TO superadmin;

--
-- Name: Unit; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Unit" (
    id text NOT NULL,
    "unitNumber" text NOT NULL,
    "propertyId" text NOT NULL,
    status public."UnitStatus" DEFAULT 'VACANT'::public."UnitStatus" NOT NULL,
    type text,
    size double precision,
    bedrooms integer,
    bathrooms double precision,
    rent double precision,
    deposit double precision,
    features text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Unit" OWNER TO superadmin;

--
-- Name: User; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    phone text,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    status public."UserStatus" DEFAULT 'ACTIVE'::public."UserStatus" NOT NULL,
    "organizationId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO superadmin;

--
-- Name: Vendor; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."Vendor" (
    id text NOT NULL,
    name text NOT NULL,
    type public."VendorType" NOT NULL,
    email text NOT NULL,
    phone text,
    address text,
    status public."Status" DEFAULT 'ACTIVE'::public."Status" NOT NULL,
    specialties text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Vendor" OWNER TO superadmin;

--
-- Name: _AmenityToProperty; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."_AmenityToProperty" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_AmenityToProperty" OWNER TO superadmin;

--
-- Name: _LeaseToTenant; Type: TABLE; Schema: public; Owner: superadmin
--

CREATE TABLE public."_LeaseToTenant" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_LeaseToTenant" OWNER TO superadmin;

--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Address" (id, street, city, state, "zipCode", country, "propertyId", "createdAt", "updatedAt") FROM stdin;
cm4bwel9z000112dix41l92zd	adma	adma	Kesrwan	00011	US	cm4bwel9r000012dit2zge278	2024-12-05 22:38:15.852	2024-12-05 22:38:15.852
cm4d2xhy70002cxq5r95jcjil	adma	adma	Kesrwan	001040	US	cm4d2xhy70001cxq5soa69tt5	2024-12-06 18:28:41.768	2024-12-06 18:28:41.768
cm4e0pb2f0002whe4jb2qvqpi	Saifi	Beirut	Beirut	498	LB	cm4e0pb2f0001whe4fo5o9rv0	2024-12-07 10:14:06.659	2024-12-08 09:12:41.167
\.


--
-- Data for Name: Amenity; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Amenity" (id, name, category, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: BackgroundCheck; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."BackgroundCheck" (id, "tenantId", status, "creditScore", "criminalRecord", "evictionHistory", "verifiedIncome", "completedAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Budget; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Budget" (id, "propertyId", year, month, category, amount, actual, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Document; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Document" (id, title, type, "fileUrl", "propertyId", "tenantId", "leaseId", "vendorId", "backgroundCheckId", "createdAt", "updatedAt", "insuranceId") FROM stdin;
\.


--
-- Data for Name: Inspection; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Inspection" (id, "propertyId", "unitId", type, status, "scheduledDate", "completedDate", notes, images, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Insurance; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Insurance" (id, type, provider, "policyNumber", "startDate", "endDate", coverage, "propertyId", "vendorId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Lease; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Lease" (id, "unitId", "startDate", "endDate", "rentAmount", "depositAmount", status, type, terms, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: LeaseRenewal; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."LeaseRenewal" (id, "leaseId", "newStartDate", "newEndDate", "newRentAmount", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: MaintenanceRequest; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."MaintenanceRequest" (id, title, description, "unitId", "requestedById", priority, status, category, "vendorId", "scheduledDate", "completedDate", cost, notes, images, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Notification" (id, "userId", title, message, type, read, "createdAt") FROM stdin;
\.


--
-- Data for Name: Organization; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Organization" (id, name, type, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Payment" (id, "tenantId", "leaseId", amount, type, status, "dueDate", "paidDate", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Property; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Property" (id, name, type, status, "managerId", "createdAt", "updatedAt") FROM stdin;
cm4bwel9r000012dit2zge278	Adma 555	RESIDENTIAL	ACTIVE	cm45yyxwz00006y01y6x77hn8	2024-12-05 22:38:15.852	2024-12-05 22:38:15.852
cm4d2xhy70001cxq5soa69tt5	Amwaj 1040	RESIDENTIAL	ACTIVE	cm45yyxwz00006y01y6x77hn8	2024-12-06 18:28:41.768	2024-12-06 18:28:41.768
cm4e0pb2f0001whe4fo5o9rv0	Saifi 498	COMMERCIAL	ACTIVE	cm45yyxwz00006y01y6x77hn8	2024-12-07 10:14:06.659	2024-12-08 09:12:41.784
\.


--
-- Data for Name: PropertyFinancial; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."PropertyFinancial" (id, "propertyId", revenue, expenses, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Subscription; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Subscription" (id, "organizationId", plan, status, "startDate", "endDate", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Task; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Task" (id, title, description, "assignedToId", "propertyId", "dueDate", priority, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Tenant; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Tenant" (id, "firstName", "lastName", email, phone, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Transaction" (id, "propertyId", "paymentId", amount, type, category, description, date, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Unit; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Unit" (id, "unitNumber", "propertyId", status, type, size, bedrooms, bathrooms, rent, deposit, features, "createdAt", "updatedAt") FROM stdin;
cm4e3jhac000cwhe4rms11m3n	01	cm4e0pb2f0001whe4fo5o9rv0	VACANT	STUDIO	100	\N	\N	200	\N	\N	2024-12-07 11:33:33.636	2024-12-07 11:33:33.636
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."User" (id, email, password, "firstName", "lastName", phone, role, status, "organizationId", "createdAt", "updatedAt") FROM stdin;
cm45yyxwz00006y01y6x77hn8	123@123.com	$2a$10$vUOeLgFYzrdSkX2rv93GOOUrj0kfHrZ.fCkw75M4bchG9.QSUoMYS	Tarek	Habib	\N	MANAGER	ACTIVE	\N	2024-12-01 19:03:27.534	2024-12-07 22:25:40.968
\.


--
-- Data for Name: Vendor; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."Vendor" (id, name, type, email, phone, address, status, specialties, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _AmenityToProperty; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."_AmenityToProperty" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _LeaseToTenant; Type: TABLE DATA; Schema: public; Owner: superadmin
--

COPY public."_LeaseToTenant" ("A", "B") FROM stdin;
\.


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: Amenity Amenity_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Amenity"
    ADD CONSTRAINT "Amenity_pkey" PRIMARY KEY (id);


--
-- Name: BackgroundCheck BackgroundCheck_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."BackgroundCheck"
    ADD CONSTRAINT "BackgroundCheck_pkey" PRIMARY KEY (id);


--
-- Name: Budget Budget_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Budget"
    ADD CONSTRAINT "Budget_pkey" PRIMARY KEY (id);


--
-- Name: Document Document_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_pkey" PRIMARY KEY (id);


--
-- Name: Inspection Inspection_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Inspection"
    ADD CONSTRAINT "Inspection_pkey" PRIMARY KEY (id);


--
-- Name: Insurance Insurance_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Insurance"
    ADD CONSTRAINT "Insurance_pkey" PRIMARY KEY (id);


--
-- Name: LeaseRenewal LeaseRenewal_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."LeaseRenewal"
    ADD CONSTRAINT "LeaseRenewal_pkey" PRIMARY KEY (id);


--
-- Name: Lease Lease_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Lease"
    ADD CONSTRAINT "Lease_pkey" PRIMARY KEY (id);


--
-- Name: MaintenanceRequest MaintenanceRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."MaintenanceRequest"
    ADD CONSTRAINT "MaintenanceRequest_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: Organization Organization_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Organization"
    ADD CONSTRAINT "Organization_pkey" PRIMARY KEY (id);


--
-- Name: Payment Payment_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_pkey" PRIMARY KEY (id);


--
-- Name: PropertyFinancial PropertyFinancial_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."PropertyFinancial"
    ADD CONSTRAINT "PropertyFinancial_pkey" PRIMARY KEY (id);


--
-- Name: Property Property_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_pkey" PRIMARY KEY (id);


--
-- Name: Subscription Subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY (id);


--
-- Name: Task Task_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);


--
-- Name: Tenant Tenant_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Tenant"
    ADD CONSTRAINT "Tenant_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: Unit Unit_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Unit"
    ADD CONSTRAINT "Unit_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Vendor Vendor_pkey; Type: CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Vendor"
    ADD CONSTRAINT "Vendor_pkey" PRIMARY KEY (id);


--
-- Name: Address_propertyId_key; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE UNIQUE INDEX "Address_propertyId_key" ON public."Address" USING btree ("propertyId");


--
-- Name: BackgroundCheck_tenantId_key; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE UNIQUE INDEX "BackgroundCheck_tenantId_key" ON public."BackgroundCheck" USING btree ("tenantId");


--
-- Name: PropertyFinancial_propertyId_key; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE UNIQUE INDEX "PropertyFinancial_propertyId_key" ON public."PropertyFinancial" USING btree ("propertyId");


--
-- Name: Subscription_organizationId_key; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE UNIQUE INDEX "Subscription_organizationId_key" ON public."Subscription" USING btree ("organizationId");


--
-- Name: Tenant_email_key; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE UNIQUE INDEX "Tenant_email_key" ON public."Tenant" USING btree (email);


--
-- Name: Transaction_paymentId_key; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE UNIQUE INDEX "Transaction_paymentId_key" ON public."Transaction" USING btree ("paymentId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Vendor_email_key; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE UNIQUE INDEX "Vendor_email_key" ON public."Vendor" USING btree (email);


--
-- Name: _AmenityToProperty_AB_unique; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE UNIQUE INDEX "_AmenityToProperty_AB_unique" ON public."_AmenityToProperty" USING btree ("A", "B");


--
-- Name: _AmenityToProperty_B_index; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE INDEX "_AmenityToProperty_B_index" ON public."_AmenityToProperty" USING btree ("B");


--
-- Name: _LeaseToTenant_AB_unique; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE UNIQUE INDEX "_LeaseToTenant_AB_unique" ON public."_LeaseToTenant" USING btree ("A", "B");


--
-- Name: _LeaseToTenant_B_index; Type: INDEX; Schema: public; Owner: superadmin
--

CREATE INDEX "_LeaseToTenant_B_index" ON public."_LeaseToTenant" USING btree ("B");


--
-- Name: Address Address_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: BackgroundCheck BackgroundCheck_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."BackgroundCheck"
    ADD CONSTRAINT "BackgroundCheck_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Budget Budget_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Budget"
    ADD CONSTRAINT "Budget_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."PropertyFinancial"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Document Document_backgroundCheckId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_backgroundCheckId_fkey" FOREIGN KEY ("backgroundCheckId") REFERENCES public."BackgroundCheck"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Document Document_insuranceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES public."Insurance"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Document Document_leaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES public."Lease"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Document Document_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Document Document_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Document Document_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Document"
    ADD CONSTRAINT "Document_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public."Vendor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Inspection Inspection_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Inspection"
    ADD CONSTRAINT "Inspection_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Inspection Inspection_unitId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Inspection"
    ADD CONSTRAINT "Inspection_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES public."Unit"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Insurance Insurance_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Insurance"
    ADD CONSTRAINT "Insurance_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Insurance Insurance_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Insurance"
    ADD CONSTRAINT "Insurance_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public."Vendor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: LeaseRenewal LeaseRenewal_leaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."LeaseRenewal"
    ADD CONSTRAINT "LeaseRenewal_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES public."Lease"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Lease Lease_unitId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Lease"
    ADD CONSTRAINT "Lease_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES public."Unit"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MaintenanceRequest MaintenanceRequest_requestedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."MaintenanceRequest"
    ADD CONSTRAINT "MaintenanceRequest_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MaintenanceRequest MaintenanceRequest_unitId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."MaintenanceRequest"
    ADD CONSTRAINT "MaintenanceRequest_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES public."Unit"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: MaintenanceRequest MaintenanceRequest_vendorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."MaintenanceRequest"
    ADD CONSTRAINT "MaintenanceRequest_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES public."Vendor"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payment Payment_leaseId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_leaseId_fkey" FOREIGN KEY ("leaseId") REFERENCES public."Lease"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Payment Payment_tenantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Payment"
    ADD CONSTRAINT "Payment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PropertyFinancial PropertyFinancial_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."PropertyFinancial"
    ADD CONSTRAINT "PropertyFinancial_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Property Property_managerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Property_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Subscription Subscription_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Task Task_assignedToId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Task Task_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_paymentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES public."Payment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."PropertyFinancial"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Unit Unit_propertyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."Unit"
    ADD CONSTRAINT "Unit_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: User User_organizationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES public."Organization"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: _AmenityToProperty _AmenityToProperty_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."_AmenityToProperty"
    ADD CONSTRAINT "_AmenityToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES public."Amenity"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _AmenityToProperty _AmenityToProperty_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."_AmenityToProperty"
    ADD CONSTRAINT "_AmenityToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES public."Property"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _LeaseToTenant _LeaseToTenant_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."_LeaseToTenant"
    ADD CONSTRAINT "_LeaseToTenant_A_fkey" FOREIGN KEY ("A") REFERENCES public."Lease"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _LeaseToTenant _LeaseToTenant_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: superadmin
--

ALTER TABLE ONLY public."_LeaseToTenant"
    ADD CONSTRAINT "_LeaseToTenant_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tenant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


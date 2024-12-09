export function BuildingsPattern() {
  return (
    <svg
      className="absolute bottom-0 left-0 right-0 w-full h-full"
      preserveAspectRatio="xMidYMax slice"
      viewBox="0 0 1200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Modern Buildings - Back Layer */}
      <path
        d="M0,400 
           h40 v-250 h60 v250
           h30 v-180 h80 v180
           h40 v-300 h70 v300
           h30 v-200 h90 v200
           h40 v-350 h60 v350
           h30 v-250 h80 v250
           h40 v-400 h100 v400
           h30 v-300 h70 v300
           h40 v-200 h90 v200
           h30 v-350 h80 v350
           h40 v-280 h60 v280
           h30 v-220 h70 v220 h70"
        className="fill-blue-400/5"
      />
      
      {/* Modern Buildings - Front Layer */}
      <path
        d="M100,400 
           h50 v-200 h40 v200
           h20 v-280 h60 v280
           h30 v-350 h50 v350
           h20 v-180 h70 v180
           h30 v-300 h40 v300
           h20 v-250 h80 v250
           h30 v-400 h60 v400
           h20 v-320 h50 v320
           h30 v-180 h70 v180
           h20 v-280 h40 v280
           h30 v-220 h60 v220 h50"
        className="fill-blue-600/5"
      />
    </svg>
  );
} 
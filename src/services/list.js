export const images = {
  "none": "",
  "type-1": "/mockup/mockify-1.svg",
  "type-2": "/mockup/mockify-2.svg",
  "type-3": "/mockup/mockify-3.svg",
  "type-4": "/mockup/mockify-4.svg",
  "type-5": "/mockup/mockify-5.svg",
  "type-6": "/mockup/mockify-6.svg",
};

export const gradients = {
  "g-1": [ "#EC4895", "#F59B0D" ],
  "g-2": [ "#F7A9D6", "#858EF8" ],
  "g-3": [ "#C126D0", "#DB2778" ],
  "g-4": [ "#6BE1BA", "#6E54EF" ],
  "g-5": [ "#16A085", "#F4D03F" ],
  "g-6": [ "#E7D1FF", "#6F26AC" ],
  "g-7": [ "#29FFC6", "#20E3B2" ],
  "g-8": [ "#EA52F8", "#0066FF" ]
};

export const shadows = Array(8).fill(0).map((_, index) => `has-shadow--s-${(index + 1)}`);

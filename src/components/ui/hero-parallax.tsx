"use client";
import React from "react";
import {
motion,
useScroll,
useTransform,
useSpring,
MotionValue,
} from "motion/react";

import { useLanguage } from "../../lib/LanguageContext";

export const HeroParallax = ({
products,
}: {
products: {
title: string;
link: string;
thumbnail: string;
}[];
}) => {
const { t } = useLanguage();
const firstRow = products.slice(0, 7);
const secondRow = products.slice(7, 13);
const thirdRow = products.slice(13, 19);
const ref = React.useRef(null);
const { scrollYProgress } = useScroll({
target: ref,
offset: ["start start", "end start"],
});

const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

const translateX = useSpring(
useTransform(scrollYProgress, [0, 1], [0, 1000]),
springConfig
);
const translateXReverse = useSpring(
useTransform(scrollYProgress, [0, 1], [0, -1000]),
springConfig
);
const rotateX = useSpring(
useTransform(scrollYProgress, [0, 0.45], [15, 0]),
springConfig
);
const opacity = useSpring(
useTransform(scrollYProgress, [0, 0.45], [0.2, 1]),
springConfig
);
const rotateZ = useSpring(
useTransform(scrollYProgress, [0, 0.45], [10, 0]),
springConfig
);
const translateY = useSpring(
useTransform(scrollYProgress, [0, 0.45], [-450, 300]),
springConfig
);
return (
<div
ref={ref}
className="h-[250vh] py-10 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
>
<Header t={t} />
<motion.div
style={{
rotateX,
rotateZ,
translateY,
opacity,
}}
className=""
>
<motion.div className="flex flex-row-reverse space-x-reverse space-x-8 mb-8">
{firstRow.map((product) => (
<ProductCard
product={product}
translate={translateX}
key={product.title}
/>
))}
</motion.div>
<motion.div className="flex flex-row mb-8 space-x-8 ">
{secondRow.map((product) => (
<ProductCard
product={product}
translate={translateXReverse}
key={product.title}
/>
))}
</motion.div>
<motion.div className="flex flex-row-reverse space-x-reverse space-x-8">
{thirdRow.map((product) => (
<ProductCard
product={product}
translate={translateX}
key={product.title}
/>
))}
</motion.div>
</motion.div>
</div>
);
};

export const Header = ({ t }: { t: (key: string) => string }) => {
return (
<div className="max-w-7xl relative mx-auto py-10 md:py-20 px-4 w-full left-0 top-0">
<h1 className="text-2xl md:text-7xl font-display font-bold text-slate-900">
{t('photo.title').split(' ').map((word, i) => (
  <React.Fragment key={i}>
    {word} {i === 1 && <br />}
  </React.Fragment>
))}
</h1>
<p className="max-w-2xl text-base md:text-xl mt-8 text-slate-500">
{t('photo.subtitle')}
</p>
</div>
);
};

export const ProductCard = ({
product,
translate,
}: {
product: {
title: string;
link: string;
thumbnail: string;
};
translate: MotionValue<number>;
key?: string;
}) => {
return (
<motion.div
style={{
x: translate,
}}
whileHover={{
y: -20,
}}
key={product.title}
className="group/product h-64 w-[22rem] relative shrink-0"
>
<img
src={product.thumbnail}
height="600"
width="600"
className="object-cover object-left-top absolute h-full w-full inset-0 rounded-2xl"
alt={product.title}
referrerPolicy="no-referrer"
/>
</motion.div>
);
};

"use client";
import React from "react";
import { HeroParallax } from "@/src/components/ui/hero-parallax";
import { useLanguage } from "../lib/LanguageContext";

export default function HeroParallaxDemo() {
  const { t } = useLanguage();

  const products = [
    {
      title: t('photo.beijing'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260513/kk519292-1.avif",
    },
    {
      title: t('photo.moments'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260513/kk517866.avif",
    },
    {
      title: t('photo.keynote'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260513/1p2a2026.avif",
    },
    {
      title: t('photo.roundtable'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260513/kk519132.avif",
    },
    {
      title: t('photo.gathering'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/segment-1.avif",
    },
    {
      title: t('photo.cmo'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/cmo.avif",
    },
    {
      title: t('photo.expo'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/aigc.avif",
    },
    {
      title: t('photo.interaction'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/segment.avif",
    },
    {
      title: t('photo.gala'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/aigclink-1.avif",
    },
    {
      title: t('photo.awards'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/aigclink.avif",
    },
    {
      title: t('photo.mvp'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/aigclink-mvp.avif",
    },
    {
      title: t('photo.infra'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/7d2b9f60074d1a8c92438ffd877020f6471000665.avif",
    },
    {
      title: t('photo.shanghai'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/1p2a2933.avif",
    },
    {
      title: t('photo.workshop'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/1p2a2879.avif",
    },
    {
      title: t('photo.lunch'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/1p2a2489.avif",
    },
    {
      title: t('photo.dev_workshop'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/1p2a2109.avif",
    },
    {
      title: t('photo.future'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/1p2a2057.avif",
    },
    {
      title: t('photo.acdc_review'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/20260117085159-1299-6.avif",
    },
    {
      title: t('photo.ecosystem'),
      link: "#",
      thumbnail: "https://user10655.cn.imgto.link/public/20260509/20260117085159-1294-6.avif",
    },
  ];

  return <HeroParallax products={products} />;
}

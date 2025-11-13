'use client';

import { installTwicpics } from "@twicpics/components/react";

installTwicpics({
  domain: "https://primeiranews.twic.pics",
  anticipation: 0.2,
  step: 5,
  // @ts-ignore
  output: "avif",
});

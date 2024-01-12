/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    siteName: string;
    variantId: string;
    rewritePath: string;
    path: string;
  }
}
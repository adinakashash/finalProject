"use client";
import ReduxProvider from '@/components/reduxProvider';
import Login from "@/components/login"
import React from 'react';
export default function LoginPage() {
  return (
    <ReduxProvider>     
       <Login/>
    </ReduxProvider>

  );
}
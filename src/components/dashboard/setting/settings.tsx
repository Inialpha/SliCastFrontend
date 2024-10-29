import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PersonalInfo from './PersonalInfo';
import Security from './Security';
import Preferences from './Preferences';
import Privacy from './Privacy';


export default function Settings() {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567'
  })

  const [preferences, setPreferences] = useState({
    theme: 'light',
    notifications: true,
    newsletter: false
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    activityStatus: true
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    passwordLastChanged: '2023-01-01'
  })

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
  }

  const handlePreferencesChange = (key: string, value: any) => {
    setPreferences({ ...preferences, [key]: value })
  }

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy({ ...privacy, [key]: value })
  }

  const handleSecurityChange = (key: string, value: any) => {
    setSecurity({ ...security, [key]: value })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-200">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <PersonalInfo />
        </TabsContent>
        <TabsContent value="preferences">
          <Preferences />
        </TabsContent>
        <TabsContent value="privacy">
          <Privacy />
        </TabsContent>
        <TabsContent value="security">
          <Security />
        </TabsContent>
      </Tabs>
    </div>
  )
}

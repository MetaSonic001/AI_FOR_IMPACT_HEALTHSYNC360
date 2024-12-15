"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info } from 'lucide-react'
import { useState } from 'react'

export default function MedicalImaging() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  type AnalysisResult = {
    diagnosis: string;
    confidence: number;
    recommendations: string[];
  };

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          setSelectedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const analyzeImage = () => {
    // Placeholder for Google Cloud Vision API call
    setAnalysisResult({
      diagnosis: "Potential pneumonia detected",
      confidence: 0.89,
      recommendations: [
        "Consult with a radiologist",
        "Order additional tests",
        "Monitor patient closely"
      ]
    })
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Medical Imaging Analysis</h2>
      <Tabs defaultValue="upload">
        <TabsList>
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Upload Medical Image</CardTitle>
              <CardDescription>Upload an X-ray, MRI, or CT scan for AI-powered analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
                {selectedImage && (
                  <div>
                    <img src={selectedImage} alt="Uploaded medical image" className="max-w-full h-auto" />
                    <Button onClick={analyzeImage} className="mt-2">Analyze Image</Button>
                  </div>
                )}
                {analysisResult && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Analysis Result</AlertTitle>
                    <AlertDescription>
                      <p>Diagnosis: {analysisResult.diagnosis}</p>
                      <p>Confidence: {(analysisResult.confidence * 100).toFixed(2)}%</p>
                      <p>Recommendations:</p>
                      <ul>
                        {analysisResult.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Analysis History</CardTitle>
              <CardDescription>View past medical image analyses</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Add a table or list of past analyses here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


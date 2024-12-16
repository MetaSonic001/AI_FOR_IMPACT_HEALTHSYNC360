"use client"

import { useState } from 'react'
import { Upload, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define the type for analysis result
type AnalysisResult = {
  diagnosis: string;
  confidence: string;
  recommendations: string[];
};

export default function MedicalImagingAnalysis() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
          setError(null);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) {
      setError("Please upload an image first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: selectedImage
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Analysis failed: ${errorBody}`);
      }

      const data = await response.json();
      
      // Parse the analysis into a structured format
      const parseAnalysis = (text: string) => {
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        return {
          diagnosis: lines[0] || "Medical Image Analysis",
          confidence: "Based on AI medical image analysis",
          recommendations: lines.slice(1, 6)
        };
      };

      setAnalysisResult(parseAnalysis(data.analysis));
    } catch (err) {
      console.error("Image analysis error:", err);
      setError(`Failed to analyze the image: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Medical Imaging Analysis</CardTitle>
              <CardDescription>Upload an X-ray, MRI, or CT scan for AI-powered analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-4">
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                {error && (
                  <Alert variant="destructive">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {selectedImage && (
                  <div className="mt-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected medical image" 
                      className="max-w-full h-auto rounded-lg mb-4"
                    />
                    <Button 
                      onClick={analyzeImage} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? "Analyzing..." : "Analyze Image"}
                    </Button>
                  </div>
                )}

                {analysisResult && (
                  <Card className="mt-4 w-full">
                    <CardHeader>
                      <CardTitle>Analysis Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p><strong>Diagnosis:</strong> {analysisResult.diagnosis}</p>
                        <p><strong>Confidence:</strong> {analysisResult.confidence}</p>
                        <div>
                          <strong>Recommendations:</strong>
                          <ul className="list-disc pl-5 mt-2">
                            {analysisResult.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
              <p>No previous analyses found.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
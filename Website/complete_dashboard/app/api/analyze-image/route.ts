import { NextRequest, NextResponse } from 'next/server';
import { genai, types } from '@google/generative-ai'; // Importing Google GenAI SDK
import base64 from 'base64url'; // Import base64 encoding/decoding library

export async function POST(request: NextRequest) {
  const req = await request.json();
  const { image } = req;

  if (!image) {
    return NextResponse.json({
      message: 'No image provided',
    }, { status: 400 });
  }

  try {
    // Initialize the GenAI client
    const client = new genai.Client({
      vertexai: true,
      project: 'continual-mind-399223',
      location: 'us-central1',
    });

    const model = 'gemini-2.0-flash-exp';
    const contents = [
      new types.Content({
        role: 'user',
        parts: [
          {
            text: 'You are an image analysis expert. Carefully analyze the provided image and give a concise assessment of its contents.'
          },
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: image.split(',')[1], // Base64 image data
            },
          },
        ],
      }),
    ];

    const generateContentConfig = new types.GenerateContentConfig({
      temperature: 1,
      top_p: 0.95,
      max_output_tokens: 8192,
      response_modalities: ['TEXT'],
      safety_settings: [
        new types.SafetySetting({
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'OFF',
        }),
        new types.SafetySetting({
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'OFF',
        }),
        new types.SafetySetting({
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'OFF',
        }),
        new types.SafetySetting({
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'OFF',
        }),
      ],
    });

    // Generate content stream from the Gemini model
    const analysisChunks = [];
    for await (const chunk of client.models.generateContentStream({
      model,
      contents,
      config: generateContentConfig,
    })) {
      analysisChunks.push(chunk);
    }

    const analysisText = analysisChunks
      .map((chunk) => chunk.content?.parts?.map((part) => part.text).join(' '))
      .join('\n');

    return NextResponse.json({
      analysis: analysisText || 'No analysis available.',
    });
  } catch (error) {
    console.error('Image analysis error:', error);
    return NextResponse.json({
      message: 'Failed to analyze image',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

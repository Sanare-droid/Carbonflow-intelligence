import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import { getSession } from '@/lib/auth';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { fileName, fileType, projectId } = await request.json();

    if (!fileName || !fileType || !projectId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const key = `documents/${projectId}/${Date.now()}-${fileName}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET || 'carbonflow-documents',
      Key: key,
      ContentType: fileType,
      Expires: 3600,
      ACL: 'private' as any,
    };

    const uploadUrl = s3.getSignedUrl('putObject', params);

    return NextResponse.json({
      uploadUrl,
      key,
    });
  } catch (error) {
    console.error('[v0] S3 upload error:', error);
    return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 });
  }
}

import { readableHtmlEvidence } from '@/lib/research';
export const dynamic = 'force-static';
export function GET() { return Response.json(readableHtmlEvidence); }

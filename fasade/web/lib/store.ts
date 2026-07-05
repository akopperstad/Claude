import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import type { HouseAnalysis } from '@pipeline/types';
import type { Level } from '@pipeline/levels';
import type { Estimate } from '@pipeline/estimate';
import type { PaletteScheme } from '@pipeline/palette';

/**
 * Filesystem JSON store — bucket 4 grade. One JSON per project plus the
 * uploaded photo next to it. Swap for Postgres + object storage at scale;
 * the surface below is the whole contract.
 */

export interface RenderRecord {
  id: string;
  /** set when this render is a chained edit of an earlier render */
  parentId?: string;
  /** the follow-up instruction that produced a chained edit */
  instruction?: string;
  level: Level;
  target: string;
  imageUrl: string; // route-served or provider URL
  estimate: Estimate;
  palette?: PaletteScheme;
  /** "Rydd & vask" applied (A21) — result must be labeled. */
  staging?: boolean;
  /** Style gallery pick (A24). */
  styleId?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  demo: boolean;
  photoPath: string; // fs path for uploads, /demo/... public path for demo
  analysis: HouseAnalysis;
  renders: RenderRecord[];
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');

async function ensureDir(): Promise<void> {
  await mkdir(path.join(DATA_DIR, 'uploads'), { recursive: true });
}

export async function createProject(
  p: Omit<Project, 'id' | 'renders' | 'createdAt'>,
): Promise<Project> {
  await ensureDir();
  const project: Project = {
    ...p,
    id: randomUUID().slice(0, 8),
    renders: [],
    createdAt: new Date().toISOString(),
  };
  await save(project);
  return project;
}

export async function getProject(id: string): Promise<Project | null> {
  if (!/^[a-f0-9-]{8}$/.test(id)) return null;
  try {
    return JSON.parse(await readFile(recordPath(id), 'utf8')) as Project;
  } catch {
    return null;
  }
}

export async function save(project: Project): Promise<void> {
  await ensureDir();
  await writeFile(recordPath(project.id), JSON.stringify(project, null, 2));
}

export async function saveUpload(bytes: Buffer, ext: string): Promise<string> {
  await ensureDir();
  const file = path.join(DATA_DIR, 'uploads', `${randomUUID().slice(0, 12)}.${ext}`);
  await writeFile(file, bytes);
  return file;
}

function recordPath(id: string): string {
  return path.join(DATA_DIR, `${id}.json`);
}

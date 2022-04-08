import os
from pathlib import Path

count = 0
for pth in Path.cwd().iterdir():
  count+=1
  filename = os.fsdecode(pth.name)
  if(filename.endswith(".jpg")):
    os.rename(filename, f'{count}.jpg')
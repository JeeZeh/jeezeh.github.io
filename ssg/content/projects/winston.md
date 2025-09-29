+++
title = "Winston"
date = 2025-10-01
external_links_target_blank = true
+++

**A few years ago**, I found myself helping a friend transcribe an interview they conducted with the wonderful, late George Winston.

<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/4zWwQIFVuMnKg7HsjhQ9Ut?utm_source=generator&theme=0" width="75%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

This was a back and forth conversation over 3 hours about his life and music. I offered to help them tackle the daunting task of transcribing the whole thing.

### Transcribing the whole thing

The purpose of the transcription was to make referencing interesting discussions and ideas easy later on.

The transcript will likely be read at least once in full, and frequently searched through the discussion to pull snippets and conversations. **In other words, we need a transcript that's easy to read and quickly searchable**. Computers are actually quite good at searching text, so doing this digitally is a probably best. Making it <q>easy to read</q>, however, is not _as_ obvious. Choosing a format that supports rich text for formatting preferences, accessibility features, etc. is a good start (`.txt` won't do!). With two speakers talking, often interleaving sentences quickly, not being able to **distinguish which speaker said what** would make things really confusing, so making sure the transcription had each speaker clearly demarcated was important.

Rather than trying doing this by hand, **the dreadful instinct to write a script took over**.

### The dreadful instinct

```md
> TODO: Graph about window of trade-off in writing scripts (saving time, learning new things, helping others learn new things)

Oh now!
```

> In all earnest, it was still much quicker than trying to transcribe it by hand, and this gave me a chance to learn some things.

I knew the hardest part of this would be speech-to-text conversion, so I immediately went looking for something that would take care of that out of the box. I tried some basic, free STT tools online but (at the time) I couldn't find one that would **recognize and group speakers** automatically.

### Amazon, transcribe!

[Amazon Transcribe](https://aws.amazon.com/transcribe/) supported speaker-grouping, and I had some experience working with AWS already, so I tried it out.

Its JSON output was nicely structured, with timestamps, confidence levels, and alternatives for each word (called a `pronunciation`):

```json
{
  "jobName": "my-first-transcription-job",
  "accountId": "111122223333",
  "results": {
    "transcripts": [
      {
        "transcript": "Welcome to Amazon Transcribe."
      }
    ],
    "items": [
      {
        "id": 0,
        "start_time": "0.64",
        "end_time": "1.09",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "Welcome"
          }
        ],
        "type": "pronunciation"
      },
      {
        "id": 1,
        "start_time": "1.09",
        "end_time": "1.21",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "to"
          }
        ],
        "type": "pronunciation"
      },
      {
        "id": 2,
        "start_time": "1.21",
        "end_time": "1.74",
        "alternatives": [
          {
            "confidence": "1.0",
            "content": "Amazon"
          }
        ],
        "type": "pronunciation"
      }
      // ...
    ]
  }
}
```

The `confidence` score would come in useful later too: the interview included a lot of Proper Nouns and some unclear sections of audio, which will be helpful to highlight in the final output.

Unfortunately, the conversation was a fair bit longer than the 60 minutes allocated on the free tier, but in the end it only cost ~$3. Worth it for the time saved, but a JSON array with _one object per word (at minimum!)_ wasn't going to save the interviewer any time!

I needed a format that would make it easy to read and search through all the `pronunciations` and `punctuations`, some sort of document of words.

### The Word Document

While I'd love to build a web-based UI for searching through vast amounts of transcription—something I would tackle a [little later](https://github.com/JeeZeh/youtube-playlist-autosub-explorer) (_post TBC_)—I didn't really have the time. A Word document was the first and easiest choice.

TODO:

1. Python script and library
2. Parse and generate Word
3. Screenshot of result

A small script to help convert a multi-speaker Amazon Transcribe JSON to Word Document (docx).

Given a JSON transcript, a Word document with clean output is produced. Output is organised by speaker and time, followed by what was said by each speaker. Phrases are colored based on the transcription confidence from Amazon Transcribe.

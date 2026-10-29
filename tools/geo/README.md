# GEO audit and private observation tools

These tools use Python 3 standard libraries. They do not collect browser cookies, obtain credentials, call a paid API, create accounts, or run on a schedule.

```powershell
python tools/geo/geo.py audit --base https://me.dufengyun.xyz --out work/geo-production-audit.json
python -m unittest discover -s tools/geo -v
python tools/geo/geo.py summarize --input work/observations.jsonl --out work/summary.json
python tools/geo/geo.py report --input work/summary.json --out work/summary.html
python tools/geo/geo.py assistant-request --model YOUR_CONFIRMED_MODEL --prompt "杜亮宽是谁？" --feature ai_search --out work/request.json
python tools/geo/geo.py submit-indexnow --config config/indexnow.local.json --out work/indexnow-receipt.json
```

Confirm current official API access and model support before executing a prepared assistant request. Credentials must remain in local environment/secret storage, never the repository, public profile, screenshots or observation exports.

The assistant-request command prepares a request only; submit-indexnow is an explicit update notification to participating search engines after verifying the public ownership file. Keep its local configuration outside version control. Receipt HTTP 200 means received, and 202 means verification pending; neither confirms indexing or Doubao inclusion. Do not resubmit unchanged content repeatedly.

An observation is a JSON object per line. Required fields are id, surface, mode, group, prompt, captured_at and transport_status (complete/blocked/error). Completed observations require the unmodified answer. Review is null until manually judged; otherwise it contains explicit boolean identity_correct, core_facts_sufficient and major_error. A major error always prevents success. Use account aliases, never access tokens or telephone numbers. Keep consumer product, same-source API and ordinary model API surfaces separate.

Blocked login attempts and unreviewed answers are reported separately; neither silently becomes a successful sample. The summary is descriptive. It does not claim a clustered confidence interval or a population-wide success rate. Keep private observations under a task output or an ignored work directory, never public/.

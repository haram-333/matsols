import os
import json
import re

content_dir = r"c:\Users\Haram\Desktop\Student Immigration & Study Abroad Platform Developmen\content"
output_file = r"c:\Users\Haram\Desktop\Student Immigration & Study Abroad Platform Developmen\src\data\degreesData.js"

# EXACT headings as requested by user (for matching in files)
headings_map = {
    "Degree Name": "name",
    "Code Number of Degree": "code",
    "About": "about",
    "Key information": "keyInformation",
    "Overview": "overview",
    "Programme structure": "structure",
    "Admission requirements": "admissionRequirements",
    "Fees and funding": "fees",
    "Scholarships": "scholarships",
    "Visa information": "visaInfo",
    "Work permit": "workPermit",
    "Tution fee / year": "tuitionFee",
    "duration of the degree": "duration",
    "apply date, start date": "applyDate",
    "Intake months": "intake",
    "campus location": "campusLocation",
    "taught in": "taughtIn",
    "name of university affiliation": "universityAffiliation",
    "progressions plus careers": "progression",
    "General info plus FAQs": "faqs"
}

# Fuzzy matching mappings (since files have variants like & instead of and)
fuzzy_variants = {
    "Programme structure": ["Programme Structure", "Programme structure"],
    "Admission requirements": ["Admission requirements", "Admission & Entry Requirements", "Admission equirements", "Admission & Entry Requirements"],
    "Fees and funding": ["Fees & Funding", "Fees And Funding", "Fees & funding", "Fees and funding"],
    "Visa information": ["Visa information", "Visa Information", "Visa info"],
    "Work permit": ["Work permit", "Work Permit"],
    "Tution fee / year": ["Tution fee / year", "Tution Fee / Year", "Tuition Fee / Year", "Tuition fee / year"],
    "duration of the degree": ["duration of the degree", "Duration Of The Degree", "duration of the degree"],
    "apply date, start date": ["apply date, start date", "Apply Date, Start Date", "apply date, start date"],
    "Intake months": ["Intake months", "Intake Months", "Intake months"],
    "campus location": ["campus location", "Campus Location", "campus location"],
    "taught in": ["taught in", "Taught In", "taught in"],
    "name of university affiliation": ["name of university affiliation", "Name Of University Affiliation", "name of university affiliation"],
    "progressions plus careers": ["Progressions & Careers", "Progressions and Careers", "Progressions plus Careers", "Progressions & careers"],
    "General info plus FAQs": ["General Info & FAQs", "General Info plus FAQs", "General info plus FAQs", "General info & FAQs", "General info plus faqs"]
}

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

def get_level(name):
    name_upper = name.upper()
    if re.search(r'\bBA\b', name_upper): return "BA"
    if re.search(r'\bMA\b', name_upper): return "MA"
    if "HND" in name_upper: return "HND"
    if "CERTIFICATE" in name_upper: return "Certificate"
    return "Degree"

degrees = []

for filename in os.listdir(content_dir):
    if not filename.endswith(".txt"):
        continue
    
    path = os.path.join(content_dir, filename)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Split content by the separator
    # The separator is usually a long line of underscores
    # We'll use regex to split by any line of 5 or more underscores or a clean break
    # But actually, the structure is Heading \n Content \n Separator
    
    # Let's try a safer approach: find all headings
    all_known_variants = []
    for h in headings_map.keys():
        all_known_variants.append(h)
        if h in fuzzy_variants:
            all_known_variants.extend(fuzzy_variants[h])
    
    # Create a regex to find these headings at the start of a line
    pattern = r'^(%s)$' % '|'.join([re.escape(v) for v in all_known_variants])
    
    # Find all matches and their positions
    matches = list(re.finditer(pattern, content, re.MULTILINE | re.IGNORECASE))
    
    degree_data = {}
    # Initialize all keys to "Not specified"
    for k in headings_map.values():
        degree_data[k] = "Not specified"
    
    for i in range(len(matches)):
        current_match = matches[i]
        heading_text = current_match.group(0).strip()
        
        # Find which canonical key this belongs to
        canonical_key = None
        for k, v in headings_map.items():
            if heading_text.lower() == k.lower():
                canonical_key = v
                break
            if k in fuzzy_variants:
                if any(heading_text.lower() == variant.lower() for variant in fuzzy_variants[k]):
                    canonical_key = v
                    break
        
        if not canonical_key:
            continue
            
        start_pos = current_match.end()
        end_pos = matches[i+1].start() if i + 1 < len(matches) else len(content)
        
        section_content = content[start_pos:end_pos].strip()
        # Clean up separators from the end of the section content
        section_content = re.sub(r'_+$', '', section_content).strip()
        
        degree_data[canonical_key] = section_content

    # Post-processing
    degree_data['name'] = degree_data.get('name', 'Unknown Degree').split('\n')[0].strip()
    degree_data['slug'] = slugify(degree_data['name'])
    degree_data['level'] = get_level(degree_data['name'])
    
    degrees.append(degree_data)

# Generate JS file
js_content = "export const degreesData = " + json.dumps(degrees, indent=2) + ";"

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully processed {len(degrees)} files.")

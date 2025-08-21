#!/usr/bin/env python3
"""
Script to add double quotes around title, description, and excerpt values
in YAML frontmatter of markdown files.
"""

import os
import re
import sys
from typing import List, Dict, Tuple

def find_markdown_files(base_dir: str) -> List[str]:
    """Find all markdown files in the specified directories."""
    directories = [
        '_posts/',
        '_i18n/en/_posts/',
        '_i18n/zh/_posts/'
    ]
    
    files = []
    for directory in directories:
        dir_path = os.path.join(base_dir, directory)
        if os.path.exists(dir_path):
            for filename in os.listdir(dir_path):
                if filename.endswith('.md'):
                    files.append(os.path.join(dir_path, filename))
    
    return sorted(files)

def parse_frontmatter(content: str) -> Tuple[str, str, str]:
    """
    Parse YAML frontmatter from markdown content.
    Returns: (frontmatter, main_content, separator)
    """
    # Check if content starts with frontmatter
    if not content.startswith('---'):
        return '', content, ''
    
    # Find the end of frontmatter
    lines = content.split('\n')
    end_index = -1
    for i, line in enumerate(lines[1:], 1):
        if line.strip() == '---':
            end_index = i
            break
    
    if end_index == -1:
        return '', content, ''
    
    frontmatter = '\n'.join(lines[1:end_index])
    main_content = '\n'.join(lines[end_index + 1:])
    
    return frontmatter, main_content, '---'

def process_yaml_field(frontmatter: str, field: str) -> str:
    """
    Add quotes around a specific YAML field if not already quoted.
    """
    # Pattern to match field: value (where value is not already quoted)
    # This handles various scenarios including multiline values
    pattern = rf'^({field}:\s*)([^"\n].*?)(?=\n\w|\n---|\n$|$)'
    
    def replace_field(match):
        field_prefix = match.group(1)
        value = match.group(2).strip()
        
        # Skip if already quoted or if it's a complex structure (starts with [ or {)
        if (value.startswith('"') and value.endswith('"')) or \
           (value.startswith("'") and value.endswith("'")) or \
           value.startswith('[') or value.startswith('{') or \
           not value:
            return match.group(0)
        
        # Handle multiline values (values that continue on next lines)
        lines = value.split('\n')
        if len(lines) > 1:
            # For multiline, only quote if it's a simple text continuation
            # Skip complex YAML structures
            for line in lines[1:]:
                if line.strip() and not line.startswith(' '):
                    return match.group(0)  # Skip complex structures
        
        # Add quotes around the value
        quoted_value = f'"{value}"'
        return f'{field_prefix}{quoted_value}'
    
    return re.sub(pattern, replace_field, frontmatter, flags=re.MULTILINE | re.DOTALL)

def process_file(filepath: str) -> Dict[str, any]:
    """
    Process a single markdown file to add quotes around title, description, excerpt.
    Returns a dictionary with processing results.
    """
    result = {
        'filepath': filepath,
        'processed': False,
        'modified': False,
        'error': None,
        'changes': []
    }
    
    try:
        # Read the file
        with open(filepath, 'r', encoding='utf-8') as f:
            original_content = f.read()
        
        # Parse frontmatter
        frontmatter, main_content, separator = parse_frontmatter(original_content)
        
        if not frontmatter:
            result['processed'] = True
            result['error'] = 'No YAML frontmatter found'
            return result
        
        # Store original for comparison
        original_frontmatter = frontmatter
        
        # Process each field
        fields_to_quote = ['title', 'description', 'excerpt']
        for field in fields_to_quote:
            new_frontmatter = process_yaml_field(frontmatter, field)
            if new_frontmatter != frontmatter:
                result['changes'].append(f'Added quotes to {field}')
                frontmatter = new_frontmatter
        
        # Check if any changes were made
        if frontmatter != original_frontmatter:
            # Reconstruct the file
            new_content = f'---\n{frontmatter}\n---\n{main_content}'
            
            # Write back to file
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            result['modified'] = True
        
        result['processed'] = True
        
    except Exception as e:
        result['error'] = str(e)
    
    return result

def main():
    """Main function to process all markdown files."""
    base_dir = '/Users/nickhuang/Documents/project/github/nickhuangcyh/nickhuangcyh.github.io'
    
    # Find all markdown files
    markdown_files = find_markdown_files(base_dir)
    
    print(f"Found {len(markdown_files)} markdown files to process...")
    print()
    
    # Process each file
    results = []
    for filepath in markdown_files:
        result = process_file(filepath)
        results.append(result)
        
        # Print progress
        relative_path = os.path.relpath(filepath, base_dir)
        if result['error']:
            print(f"❌ Error processing {relative_path}: {result['error']}")
        elif result['modified']:
            changes = ', '.join(result['changes'])
            print(f"✅ Modified {relative_path}: {changes}")
        else:
            print(f"⚪ No changes needed for {relative_path}")
    
    # Print summary
    print("\n" + "="*60)
    print("SUMMARY")
    print("="*60)
    
    total_files = len(results)
    processed_files = sum(1 for r in results if r['processed'])
    modified_files = sum(1 for r in results if r['modified'])
    error_files = sum(1 for r in results if r['error'])
    
    print(f"Total files found: {total_files}")
    print(f"Files processed: {processed_files}")
    print(f"Files modified: {modified_files}")
    print(f"Files with errors: {error_files}")
    
    if error_files > 0:
        print("\nFiles with errors:")
        for result in results:
            if result['error']:
                relative_path = os.path.relpath(result['filepath'], base_dir)
                print(f"  - {relative_path}: {result['error']}")
    
    print("\nDone!")

if __name__ == "__main__":
    main()
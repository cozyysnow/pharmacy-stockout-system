import csv

with open('docs/dataset/DATA_DICTIONARY.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    rows = list(reader)

with open('docs/dataset/DATA_DICTIONARY.md', 'w', encoding='utf-8') as out:
    out.write('# Pharmacy Stock-Out Dataset — Data Dictionary\n\n')
    if rows:
        header = rows[0]
        out.write('| ' + ' | '.join(header) + ' |\n')
        out.write('| ' + ' | '.join(['---'] * len(header)) + ' |\n')
        for row in rows[1:]:
            cleaned_row = [col.replace('|', '\\|').replace('\n', ' ') for col in row]
            out.write('| ' + ' | '.join(cleaned_row) + ' |\n')
print("Successfully generated docs/dataset/DATA_DICTIONARY.md")

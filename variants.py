import random



data = list()

for i in range(2, 10):
    for j in range(2, i):
        data.append([i, j])
        data.append([j, i])
    data.append([i, i])
print(data)

result = list()
other = list()

for i in range(0, 30):

    found = False
    while not found:
        index_in_block = random.randint(0, 3)
        index_in_array = i * 2 + index_in_block
        if index_in_array not in result:
            result.append(index_in_array)
            found = True

for i in range(0, len(data)):
    if i not in result:
        other.append(i)

# result.extend()

random.shuffle(other)

result.extend(other)

print("---")
print(result)

'''
Given two strings, determine if they share a common substring. A substring may be as small as one character.

For example, the words "a", "and", "art" share the common substring . The words "be" and "cat" do not share a substring.
'''

def twoStrings(s1, s2):
    # for char in s1:
    #     if char in s2:
    #         return "Yes"
    #
    # return 'No'

    set1 = set(s1)
    set2 = set(s2)

    if len(set1 & set2) > 0:
        return "YES"

    return "NO"

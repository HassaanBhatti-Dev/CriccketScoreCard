1. Commit Message Pattern : 
issue/[Number]: [AUTHOR] -- [updates]
example --> "issue/16: WAB -- added ChangeLog file to track history of changes and address issue Number"

2. How to Version --> main.major.minor
                 1.0.0
|  Release | Feature Resolve | Bug Resolve |
    2.0.0  |     1.1.0       | 1.0.1

3. Branch Should be created in Issues

4. Add Issue link on each PR

5. For Any Issues in Web Page, Create issue first before resolving it.

6. Delete Origin Branches after PR is Merged.

7. Update CHANGELOG , Address Issue in | Case | as issue/[Number]

--------------------------------------------------------------------------
                            Coding Standards
--------------------------------------------------------------------------
Variable Name : In CamelCase -- Should be Meaningful
              : Add Comment Why this Variable is created
Function Name : In CamelCase -- Should be Meaningful
              : Add Comment Why this function is created
Blank Line    : No Blank line in starting of any function, 
              : Before and After If Block
              : before Return statement
              : Before Function Call
              : Code should be Formatted before Push.
Exported func : Pascal Case for Exported Function Name
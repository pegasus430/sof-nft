#include "stdio.h"
#include <stdlib.h>
#include <windows.h>
#include <exception>

enum RARITY {
	VOUCHER,
    COMMON,
    RARE,
    MYTHIC,
    LEGENDARY,
    SANTA,
    COUNT
};

int main()
{
	const int MAX_TOKEN_MINT = 3003;
	int _nextTokenId = 1;
	int totalPercentage = 3003;
	unsigned int currentRaritySupply[COUNT] = {0, };
	unsigned int maxRaritySupply[COUNT] = {900, 900, 600, 450, 150, 3};
	const char* registeredMetadata[COUNT] = {
		"meta1",
		"meta2",
		"meta3",
		"meta4",
		"meta5",
		"meta6",
	};	

	srand(GetTickCount());

	while (1)
	{
        unsigned int currentTokenId = _nextTokenId;
        if (currentTokenId > MAX_TOKEN_MINT)
		{
			break;
		}

        unsigned int rval = rand();
        rval = rval % totalPercentage;
        unsigned int i;
        unsigned int currPercentage = 0;
        for (i = 0; i < COUNT; i ++) {
            if (currentRaritySupply[i] == maxRaritySupply[i])
                continue;
			
            if (rval >= currPercentage && rval < currPercentage + maxRaritySupply[i])
                break;
			currPercentage += maxRaritySupply[i];
        }
		
        if (i == COUNT)
		{
			throw exception("bad case");
		}
		
        if (currentRaritySupply[i] + 1 >= maxRaritySupply[i]) {
            totalPercentage -= maxRaritySupply[i];
        }
        currentRaritySupply[i] ++;
		
        const char* uri = registeredMetadata[i];
		printf("%d, %d, %s\n", rval, i, uri);
		{
			FILE *fl = fopen("1.txt", "a");
			if (fl)
			{
				fprintf(fl, "%d\t%d\t%s\n", rval, i, uri);
				fclose(fl);
			}
		}

		_nextTokenId ++;
	}
	return 0;
}
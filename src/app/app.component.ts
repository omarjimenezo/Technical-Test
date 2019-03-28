import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    fibonacciArr: any = [];
    permutationArr: any = [];
    stringPosition: number;
    frameArr: any = [];
    parenthesesArr: any = [];

    ngOnInit(): void {
        // @param number: number fibonacci sequences desired
        this.getFibonacci(90);

        // @param string: permutation word
        // @param string: next permutation word ('') for functional propouses
        this.getPermutation('perm', '');

        // @param string: search string
        this.getPosition('car');

        this.getFrame();

        // @param number: number of initial left parentheses
        // @param number: number of initial right parentheses (0) for functional propouses
        // @param string: final parentheses string ('') for functional propouses
        this.getParentheses(3, 0, '');
    }

    getFibonacci(_limit: number) {
        let sum = 0;

        // initialize the first two sequences of the fibonacci array series
        this.fibonacciArr.push(0);
        this.fibonacciArr.push(1);


        // Adding the next elements of the series
        for (let i = 0; i < _limit - 2; i++) {
            // Sums the previous element with the next
            sum = this.fibonacciArr[i] + this.fibonacciArr[i + 1];

            // Validate the max "number" type value for ES6 (9007199254740991) if it surpases this limit the script will stop 
            // because it will give wrong results
            if (sum > 9007199254740991) {
                this.fibonacciArr.push('The sequence ' + (i + 2) + ' exceeds the maximum value of ES6 number type (9007199254740991)');
                return 0;
            }

            // Build the fibonacci array
            this.fibonacciArr.push(sum);
        }

        console.log('Fibonacci sequence', this.fibonacciArr);
    }

    getPermutation(_word: string, _permutation: string) {
        let wordArr: any = [];
        let character: string;
        let combination: string;

        // Validating the mach character lenght, if there is more than 50 characters we throw an alert and stop the function
        if (_word.length >= 50) {
            this.permutationArr.push('Max length is 50 characters');
            return 0;
        }

        // Split the string into an array of characters
        wordArr = _word.split('');

        // Build the permutation array if there is no more words in the recursion
        if (_word.length === 0) {
            this.permutationArr.push(_permutation);
        } else {
            for (let i = 0; i < wordArr.length; i++) {
                // Take the first char of the array
                character = wordArr[i];
                // concatenate the next two chars permuted
                combination = _word.substring(0, i) + _word.substring(i + 1);
                // Recursively call the function with the permuted combination and the new decremented word
                // without the first character taken
                this.getPermutation(combination, _permutation + character);
            }
        }
    }

    getParentheses(_left: number, _right: number, _parentheses: string) {
        // check if there is parentheses left, then build the final response array
        if (_left === 0 && _right === 0) {
          this.parenthesesArr.push(_parentheses);
        }

        // if there is left parethesis to add, then we concatenate a left parentheses to the string
        // and recursively call the function with a left parethesis less and add a right parenthesis count
        if (_left > 0) {
          this.getParentheses(_left - 1, _right + 1, _parentheses + '(');
        }

        // if there is right parethesis to add, then we concatenate a right parentheses to the string
        // and recursively call the function with a right parethesis less and keep left parenthesis count
        if (_right > 0) {
          this.getParentheses(_left, _right - 1, _parentheses + ')');
        }
    }

    getPosition(_word: string) {
        // Initialize the given array
        const givenArray = ['at', '', '', '', 'ball', '', '', 'car', '', '', 'dad', '', ''];
        let i = 0;

        // Iterate through the elements of the array
        givenArray.forEach(element => {
            // If the word matches the array element then get the position by the counter
            if (_word === element) {
                this.stringPosition = i;
            }
            i++;
        });
    }

    getFrame() {
        const givenArray = ['November', 'is', 'the', 'coolest', 'month', 'of', 'the', 'Year'];
        let numberSpaces: number;
        let topBottom = '';
        // Get the longest string in the array
        const longString = givenArray.reduce((a, b) => a.length > b.length ? a : b);
        // Get the lenght of the longest string
        const maxLength = longString.length;

        // Builds the top and the bottom of the frame based on the lenght of the
        for (let i = 0; i <= maxLength + 3; i++) {
            topBottom = topBottom + '*';
        }

        console.log(topBottom);

        // Iterates the given array
        givenArray.forEach(element => {
            let blankSpace = '';
            // Calculates the number of blank spaces needed to fill the frame
            numberSpaces = (maxLength - element.length);
            // While there is number of blank spaces concatenate spaces
            while (numberSpaces > 0) {
                blankSpace = blankSpace.concat(' ');
                numberSpaces--;
            }
            // Builds the inner frame and print in in console log
            console.log('* ' + element + blankSpace + ' *');
        });

        console.log(topBottom);
    }
}

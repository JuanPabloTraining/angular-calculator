pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Install packages') {
            script {
                sh 'npm install'
            }
        }

        stage('Run the tests') {
            script {
                sh 'ng test --watch=false'
            }
        }

        stage('Run the App') {
            script {
                sh 'ng serve &'
                sleep 5
            }
        }
    }
}

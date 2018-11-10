#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node:7-alpine'
        }
    }

    stages {
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'node --version'
            }
        }
    }
}

#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node'
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
